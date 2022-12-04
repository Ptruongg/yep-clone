from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import User, Business, Review

class BusinessForm(FlaskForm):
    name = StringField("Name of business", validators=[DataRequired('Name is required')])
    description = StringField("Business description")
    address = StringField("Address", validators=[DataRequired('Address is required')])
    city = StringField("City", validators=[DataRequired('City is required')])
    state = StringField("State", validators=[DataRequired('State is required')])
    zipcode = IntegerField("Zipcode", validators=[DataRequired('Zipcode is required')])
    country = StringField("Country", validators=[DataRequired('Country is required')])
    user_id = IntegerField("Owner of business", validators=[DataRequired()])
    phoneNumber = StringField("Phone Number", validators=[DataRequired('Phone Number is required'), Length(min=10, max=10, message="Phone Number must be 10 digits")])
    imageUrl = StringField("imageUrl", validators=[DataRequired('Please enter in an image url')])
    # submit = SubmitField("Submit")
