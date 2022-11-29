from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import db, User, Business
from app.forms import BusinessForm
from werkzeug.utils import secure_filename
import os

business_routes = Blueprint("businesses", __name__)

# get all businesses route


@business_routes.route("/")
def businesses():
    all_businesses = Business.query.all()
    businesses = [business.to_dict() for business in all_businesses]
    response = {"businesses": businesses}
    return response


# get a business based on id
@business_routes.route("/<int:id>")
def business_by_id(id):
    one_business = Business.query.filter(Business.id == id)
    business = [business.to_dict() for business in one_business]
    response = {"business": business}
    return response

# get businesses owned by one user
@business_routes.route("user/<int:userId>/")
@login_required
def businesses_of_user(userId):
    userBusinesses = Business.query.filter(Business.user_id == userId).all()
    businesses = [business.to_dict() for business in userBusinesses]
    response = {"businesses": businesses}
    return response

# create a busines
@business_routes.route("/", methods=['POST'])
def create_business():
    new_business = BusinessForm()
    new_business["csrf_token"].data = request.cookies["csrf_token"]
    if new_business.validate_on_submit():
        newBusiness = Business(
            name=new_business.data['name'],
            description=new_business.data['description'],
            address=new_business.data['address'],
            city=new_business.data['city'],
            state=new_business.data['state'],
            zipcode=new_business.data['zipcode'],
            country=new_business.data['country'],
            user_id=new_business.data['user_id'],
            phoneNumber=new_business.data['phoneNumber'],
        )
        # new_business = Business(
        #     name = name,
        #     description = description,
        #     address = address,
        #     city = city,
        #     state = state,
        #     zipcode = zipcode,
        #     country = country,
        #     phoneNumber = phoneNumber,
        # )
        # print(newBusiness)
        db.session.add(newBusiness)
        db.session.commit()
        return newBusiness.to_dict()
    else:
        print(request.cookies["csrf_token"], "@@@@@@@@@@@@@@@@")
        print(new_business.data['user_id'], "===========================")
        print(new_business.data['phoneNumber'], 'dasdadasddasdasdasd'),
        return "Unauthorized", 403


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
    phoneNumber = updated_business.data['phoneNumber']

    business.name = name
    business.description = description
    business.address = address
    business.city = city
    business.state = state
    business.zipcode = zipcode
    business.country = country
    business.phoneNumber = phoneNumber

    db.session.commit
    return business.to_dict()

# delete a business


@business_routes.route("/<business_id>", methods=['DELETE'])
def delete_tweet(business_id):
    business = Business.query.get(business_id)
    if not business:
        return "The Business you are looking for can not be found!", 404

    db.session.delete(business)
    db.session.commit()

    return "Successfully Deleted"
