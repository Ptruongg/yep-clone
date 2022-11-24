from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import Project, Comment, db, User, Business
from app.forms import BusinessForm
from werkzeug.utils import secure_filename
import os

business_routes = Blueprint("businesses", __name__)

# get all businesses route

@business_routes.route("/")
def businesses():
    if(current_user):
        all_businesses = Business.query.all()
        businesses = [business.to_dict() for business in all_businesses]
        response = {"businesses": businesses}
        return response
    else:
        return "Unauthorized User!"

# get a business based on id
@business_routes.route("/<int:id>")
def business_by_id():
    one_business = Business.query.filter(Business.id == id)
    business = [business.to_dict() for businesss in one_business]
    response = {"business": business}
    return response

#create a business
@business_routes.route("/<int:id>", methods=['POST'])
def create_business():
    new_business = BusinessForm()

    name = new_business.data['name']
    description = new_business.data['description']
    address = new_business.data['address']
    city = new_business.data['city']
    state = new_business.data['state']
    zipcode = new_business.data['zipcode']
    country = new_business.data['country']
    phone_number = new_business.data['phone_number']

    new_business = Business(
        name = name,
        description = description,
        address = address,
        city = city,
        state = state,
        zipcode = zipcode,
        country = country,
        phone_number = phone_number,
    )

    db.session.add(new_business)
    db.session.commit(new_business)
    return new_business.to_dict()


# edit a business
@business_routes.route("/<int:id>", methods=["PUT"])
def edit_business(id):
    business = Business.query.filter(Business.id == id)

    updated_business = BusinessForm()
    name = updated_business.data['name']
    description = updated_business.data['description']
    address = updated_business.data['address']
    city = updated_business.data['city']
    state = updated_business.data['state']
    zipcode = updated_business.data['zipcode']
    country = updated_business.data['country']
    phone_number = updated_business.data['phone_number']

    business.name = name
    business.description = description
    business.address = address
    business.city = city
    business.state = state
    business.zipcode = zipcode
    business.country = country
    business.phone_number = phone_number

    db.session.commit
    return business.to_dict()
