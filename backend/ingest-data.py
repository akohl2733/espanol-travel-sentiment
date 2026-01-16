import os

import pandas as pd

from app.models import Country, City, ClimateNormal
from app.database import Base, engine, SessionLocal


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    raise


def ingest_countries():

    csv_file = os.path.join(BASE_DIR, "data/countries-by-region.csv")

    try:
        df = pd.read_csv(csv_file)
        db = SessionLocal()
    except Exception as e:
        raise

    try:
        for _, row in df.iterrows():
            print(row)

            exists = db.query(Country).filter(Country.name == row["country"]).first()

            if not exists:
                new_country = Country(
                    name=row["country"],
                    region=row["region"],
                )
            db.add(new_country)
        
        db.commit()
        print("Countries ingested properly")

    except Exception as e:
        db.rollback()
        print(f'Error during ingestion {e}')
    finally:
        db.close()


def ingest_cities():

    csv_file = os.path.join(BASE_DIR, "data/cities-by-location.csv")

    try:
        df = pd.read_csv(csv_file)
        db = SessionLocal()
    except Exception as e:
        raise

    try:
        for _, row in df.iterrows():
            print(row)

            exists = db.query(City).filter(City.city == row["city"]).first()
            country = db.query(Country).filter(Country.name == row["country"]).first()
            
            if country:
                actual_id = country.id
            else:
                print(f"Warning: {row["Country"]} not found in countries table.")
                continue

            if not exists:
                new_city = City(
                    city=row["city"],
                    country_id=actual_id,
                    lat=row["lat"],
                    long=row["long"],
                )
            db.add(new_city) 

        db.commit()
        print("Countries ingested properly.")
    except Exception as e:
        db.rollback()
        print(f"Error with inserting rows {e}")
    finally:
        db.close()


def ingest_weather():

    csv_file = os.path.join(BASE_DIR, "data/weather-by-city.csv")

    try:
        df = pd.read_csv(csv_file)
        db = SessionLocal()
    except Exception as e:
        raise

    try:
        for _, row in df.iterrows():
            print(row)

            city = db.query(City).filter(City.city == row["city"]).first()
            if not city:
                print(f"Warning: {row["city"]} not found in countries table.")
                continue
            else:
                actual_id = city.id

            new_weather = ClimateNormal(
                city_id=actual_id,
                month=row["month"],
                avg_high_temp=row["avg_high_temp"],
                avg_low_temp=row["avg_low_temp"],
                rainy_days=row["rainy_days"],
                total_rain_in=row["total_rain_in"],
            )
            db.add(new_weather)

        db.commit()
        print("Data was ingested properly.")
    except Exception as e:
        db.rollback()
        print(f"Issue with database entries {e}")
    finally:
        db.close()
    
        
if __name__ == "__main__":
    pass
