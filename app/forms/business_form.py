from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.models import User, Business, Review

class BusinessForm(FlaskForm):
    name = StringField("Name of business", validators=[DataRequired()])
    description = StringField("Business description")
    address = StringField("Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    zipcode = IntegerField("Zipcode", validators=[DataRequired()])
    country = StringField("Country", validators=[DataRequired()])
    user_id = IntegerField("Owner of business", validators=[DataRequired()])
    phone_number = IntegerField("Phone Number", validators=[DataRequired()])
    submit = SubmitField("Submit")
