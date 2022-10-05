from fileinput import filename
from pickle import GET
from flask import Flask,render_template,send_file,request,redirect, jsonify
import requests
import os
from datetime import datetime as dt
from __init__ import create_app, db
from models import New_Orleans_Breweries


# app = Flask(__name__)
app = create_app()
# this is create for I can perform database operations outside an application context
app.app_context().push()
db.create_all()



def New_Orleans_Breweries_serializer(brews):
     return {
        'id' : brews.id,
        'name': brews.name,
        'street': brews.street,
        'city': brews.city,
        'state' : brews.state,
        'postal_code' : brews.postal_code,
        'longitude' : brews.longitude,
        'latitude' : brews.latitude,
        'url' : brews.url
     }

# use requests to get the api data
# use exception handling to check for errors
# get the api, then create the database and then store the data api is giving us into the database
try:
        response = requests.get("https://api.openbrewerydb.org/breweries?by_city=new_orleans&per_page=10")
        response.raise_for_status()
        response = response.json()
except requests.exceptions.HTTPError as error:
            print(error)

def api_to_database():
    # iterate over the response json to dynamically add all the values to the table
    for i in response:
                id = i['id']
                name = i['name']
                street = i['street']
                city = i['city']
                state = i['state']
                postal_code = i['postal_code']
                longitude = i['longitude']
                latitude = i['latitude']
                url = i['website_url']
                # check if values is in the table before creating a new table
                check_id = New_Orleans_Breweries.query.order_by(New_Orleans_Breweries.id.desc()).first()
                if check_id:
                    return(print('Table is already created'))
                # if not create new table
                brewery_table = New_Orleans_Breweries(id=id, name=name, street=street, city=city, state=state,
                                                                postal_code=postal_code, longitude=longitude, latitude=latitude,
                                                                url=url)
                db.session.add(brewery_table)
                db.session.commit()
# create database
api_to_database()


@app.route("/")
def index():
  return "<h1>Hello World</h1>"

@app.route("/data", methods=['GET'])
def api():
    table = New_Orleans_Breweries.query.all()
    json = (jsonify([*map(New_Orleans_Breweries_serializer, table)]))

    return json
if __name__ == "__main__":
#   db.create_all(app=create_app())
  app.run(host="0.0.0.0", port=8080, debug=False)
