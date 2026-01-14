from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base


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
async def get_data():
    return {"message": "This is functioning", "Things to do": ["set up react pieces", 'figure out how to pull in API data']}