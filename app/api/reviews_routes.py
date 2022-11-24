from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import Project, Comment, db, User, Business, Review
from app.forms import CreateReviewForm
from werkzeug.utils import secure_filename
import os

review_routes = Blueprint('reviews', __name__)

#get all reviews
@review_routes.route('/')
def get_all_reviews():
    all_reviews = Review.query.all()
    return {"reviews": [reviews.dict() for reviews in all_reviews]}

#get review by id
@review_routes.route('/<int:id>')
def get_review_id(id):
    review = Review.query.get(id)
    return review.to_dict()

#create a review
@review_routes('/', methods=['POST'])
@login_required
def create_review():
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            review = form.data['review'],
            rating = form.data['rating'],
            user_id = form.data['user_id'],
            business_id = form.data['business_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
