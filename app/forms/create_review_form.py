from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import User, Business, Review

class CreateReviewForm(FlaskForm):
    review = StringField('Review Message', validators=[DataRequired("To submit your review, please enter in a review"), Length(min=4, max=100, message="Review must be between 4 and 100 characters")])
    rating  = IntegerField('Rating', validators=[DataRequired("Rating must be between 1 and 5")])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    business_id = IntegerField('Business Id', validators=[DataRequired()])
    # submit = SubmitField('Submit')
