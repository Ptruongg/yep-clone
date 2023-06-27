from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import db, User, Business, Review, BusinessImage
# from app.models.business import bookmarks
from app.forms import BusinessForm
from werkzeug.utils import secure_filename
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename
)
import os

# import boto3



# from botocore.client import Config

# ACCESS_KEY_ID ='AKIAU2MZUKFHOAPHEEI6'
# ACCESS_SECRET_KEY='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'
# BUCKET_NAME='yep-proj-master'

# data = open('test.png', 'rb')

# s3 = boto3.resource(
#     "s3",
#     aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
#     aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
#     config=Config(signature_version='s3v4'),
# )

# s3.create_bucket(Bucket=BUCKET_NAME)

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
# @login_required
def businesses_of_user(userId):
    userBusinesses = Business.query.filter(Business.user_id == userId).all()
    businesses = [business.to_dict() for business in userBusinesses]
    response = {"businesses": businesses}
    return response

# get reviews from business id


@business_routes.route("/<business_id>/reviews")
def get_review_id(business_id):
    reviews = Review.query.get(Review.business_id == business_id).all()
    response = [review.to_dict() for review in reviews]
    res = {'reviews': response}
    return res

# create a busines


@business_routes.route("/", methods=['POST'])
@login_required
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
            imageUrl=new_business.data['imageUrl']
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

        return "Unauthorized", 403


# edit a business
@business_routes.route("/<business_id>", methods=["PUT"])
@login_required
def edit_business(business_id):
    # print('id', id)
    business = Business.query.get(business_id)

    if not business:
        return "Business could not be found!", 404

    updated_business = BusinessForm()
    # print(business_id, 'buid')
    updated_business['csrf_token'].data = request.cookies['csrf_token']
    name = updated_business.data['name']
    description = updated_business.data['description']
    address = updated_business.data['address']
    city = updated_business.data['city']
    state = updated_business.data['state']
    zipcode = updated_business.data['zipcode']
    country = updated_business.data['country']
    phoneNumber = updated_business.data['phoneNumber']
    imageUrl = updated_business.data['imageUrl']
    # user_id = updated_business.data['user_id'],

    business.name = name
    business.description = description
    business.address = address
    business.city = city
    business.state = state
    business.zipcode = zipcode
    business.country = country
    business.phoneNumber = phoneNumber
    business.imageUrl = imageUrl
    # business.user_id = user_id

    db.session.commit()
    return business.to_dict()

# delete a business


@business_routes.route("/<business_id>", methods=['DELETE'])
@login_required
def delete_business(business_id):
    business = Business.query.get(business_id)
    if not business:
        return "The Business you are looking for can not be found!", 404

    db.session.delete(business)
    db.session.commit()

    return "Successfully Deleted"

# saving a bookmark
# @business_routes.route("/<int:id>/bookmarks/<int:id2>", methods=['POST'])
# def saved_business(id, id2):
#     curr_user = User.query.get(id)
#     business = Business.query.get(id2)

#     business.business_bookmarks.append(curr_user)
#     db.session.commit()
#     user_info = db.session.query(bookmarks).filter_by(user_id = id).all()
#     newObj = {"business_ids": []}
#     for x, z in user_info:
#         if x == id:
#             newObj[['business_ids'].append(z)]
#     return newObj

#post new business images
@business_routes.route("/<int:busId>/images", methods=["POST"])
@login_required
def upload_image(busId):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type is not supported"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        print("upload", upload)

        return upload, 400

    url = upload["url"]
    new_image = BusinessImage(url = url, business_id=busId, preview=True)
    db.session.add(new_image)
    db.session.commit
    return {"url": url}

@business_routes.route("/<int:busId>/images")
def get_all_images(busId):
    images = BusinessImage.query.filter_by(business_id = busId).all()
    return {"images": [image.to_dict() for image in images]}
