from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import db, User, Business, Review
from app.forms import CreateReviewForm
from werkzeug.utils import secure_filename
import os

review_routes = Blueprint('reviews', __name__)

# get all reviews


@review_routes.route('/')
def get_all_reviews():
    all_reviews = Review.query.all()
    return {"reviews": [reviews.to_dict() for reviews in all_reviews]}

# get review by id
# @review_routes.route('/<business_id/rev>/')
# def get_review_id(business_id):
#     reviews = Review.query.get(Review.business_id == business_id).all()
#     response = [review.to_dict() for review in reviews]
#     res = {'reviews': response}
#     return res
#     # return review.to_dict()


# create a review
@review_routes.route('/<business_id>/reviews', methods=['POST'])
@login_required
def create_review(business_id):
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            review=form.data['review'],
            rating=form.data['rating'],
            user_id=form.data['user_id'],
            business_id=form.data['business_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

# update a review


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    form = CreateReviewForm()
    form = ['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(id)

    if current_user.id == review.user_id:
        review.review = form.data['review']
        review.rating = form.data['rating']

        db.session.commit()
        return review.to_dict()
    else:
        return "404: Unauthorized User"

# delete a review


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        if current_user.id == review.user_id:
            db.session.delete(review)
            db.session.commit()
            return "Review has been successfully deleted"
        else:
            return "404 Unauthorized User"
    else:
        return "Review not found"
