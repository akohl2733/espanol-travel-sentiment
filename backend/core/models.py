from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base, get_db


# data for basic Country/Regional location
class Country(Base):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    region = Column(String)

    cities = relationship("City", back_populates="country")


# data for city location and coordinates, using FK from country
class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True)
    city = Column(String)
    country_id = Column(ForeignKey("countries.id"))
    lat = Column(Float)
    long = Column(Float)

    country = relationship("Country", back_populates="cities")
    climate_data = relationship("ClimateNormal", back_populates="city")


# data for climate by month from each city, linked to FK of city name
class ClimateNormal(Base):
    __tablename__ = "climate_normals"

    id = Column(Integer, primary_key=True)
    city_id = Column(ForeignKey("cities.id"))
    month = Column(Integer)
    avg_high_temp = Column(Float)
    avg_low_temp = Column(Float)
    rainy_days = Column(Float)
    total_rain_in = Column(Float)

    city = relationship("City", back_populates="climate_data")
