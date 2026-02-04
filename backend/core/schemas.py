from pydantic import BaseModel
from typing import List


class CountrySchema(BaseModel):
    name: str
    region: str

    class Config:
        from_attributes = True


class ClimateSchema(BaseModel):
    month: int
    avg_high_temp: float
    avg_low_temp: float
    rainy_days: float
    total_rain_in: float

    class Config:
        from_attributes = True

class CitySchema(BaseModel):
    id: int
    city: str
    lat: float
    long: float

    class Config:
        from_attributes = True


class CityDetailSchema(BaseModel):
    id: int
    city: str
    lat: float
    long: float
    country: CountrySchema
    climate_data: List[ClimateSchema]

    class Config:
        from_attributes = True


class CityByRegionSchema(BaseModel):
    id: int
    name: str
    region: str
    cities: List[CitySchema]

    class Config:
        from_attributes = True
