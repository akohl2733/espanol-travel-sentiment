from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import joinedload
from .database import get_db, Base, SessionLocal, engine
from .models import City, Country, ClimateNormal


app = FastAPI()


origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# create tables as soon as this file is run
Base.metadata.create_all(bind=engine)


@app.get("/")
async def root():
    return {"Hello": "World"}


@app.get("/data")
async def get_data(db: SessionLocal = Depends(get_db)):
    countries = db.query(Country).all()
    return countries


@app.get("/city/{id}")
async def get_city_details(city_id: int, db: SessionLocal = Depends(get_db)):
    city = db.query(City).options(
        joinedload(City.country),
        joinedload(City.climate_data)
    ).filter(City.id == city_id).first()
    return city
