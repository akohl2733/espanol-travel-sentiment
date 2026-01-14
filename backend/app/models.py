from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Country(Base):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    region = Column(String)

    cities = relationship("City", back_populates="country")


class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True)
    city = Column(String)
    country_id = Column(ForeignKey("countries.id"))
    lat = Column(Float)
    long = Column(Float)

    country = relationship("Country", back_populates="cities")
