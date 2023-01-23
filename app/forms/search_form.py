from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import User, Business, Review

class SearchForm(FlaskForm):
    name = StringField("name")
    city = StringField("city")
    state = StringField("state")
