from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User

class ReviewImageForm(FlaskForm):
    url = StringField("Url", validators=[DataRequired()])
