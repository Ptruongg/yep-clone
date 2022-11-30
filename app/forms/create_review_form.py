from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.models import User, Business, Review

class CreateReviewForm(FlaskForm):
    review = StringField('Review Message', validators=[DataRequired("To submit your review, please enter in a review")])
    rating  = IntegerField('Rating', validators=[DataRequired("Rating must be between 1 and 5")])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    business_id = IntegerField('Business Id', validators=[DataRequired()])
    # submit = SubmitField('Submit')
