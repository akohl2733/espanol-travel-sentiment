from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# DATABASE URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./travelsentiment.db"


# set up pieces to connect ot and run db
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()