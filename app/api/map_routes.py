# from pprint import pprint;
# import googlemaps # pip install googlemaps;

# API_KEY = 'AIzaSyA0023gzL9IJRAFHi_z50PNPSMMda04hIc'

# map_client = googlemaps.Client(API_KEY)

# work_place_address = '1 Market St, San Francisco, CA'
# response = map_client.geocode(work_place_address)
# pprint(response)
# print(response[0]['geometry'])
from flask import Flask, Blueprint
from flask_login import login_required
import os


key_routes = Blueprint("key", __name__)


@key_routes.route("/", methods=["POST"])
@login_required
def key():
    key = os.environ.get("MAPS_API_KEY")
    return {"googleMapsAPIKey": key}
