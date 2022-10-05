from unicodedata import name
# from flask_login import UserMixin
from __init__ import db


# create the Class/Model
class New_Orleans_Breweries(db.Model):
    id = db.Column(db.String(100), primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(100))
    street = db.Column(db.String(100))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    postal_code = db.Column(db.String(100))
    longitude = db.Column(db.String(100))
    latitude = db.Column(db.String(100))
    url = db.Column(db.String(100))

    def __str__(self):
        return f"<id={self.id} name={self.name} street={self.street} city={self.street} state={self.state}, postal_code={self.postal_code}, longitude={self.longitude}, latitude={self.latitude}, url={self.url}>"
    # create the constructor
    # This creates the object of the Class
    def __init__(self, name, street, city, state, postal_code, longitude, latitude, url):
        self.name = name
        self.street = street
        self.city = city
        self.state = state
        self.postal_code = postal_code
        self.longitude = longitude
        self.latitude = latitude
        self.url = url


