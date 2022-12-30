from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import User, Business, Review, Bookmark

class BookmarkForm(FlaskForm):
   user_id = IntegerField("User Id")
   business_id = IntegerField("BusinessI Id")
