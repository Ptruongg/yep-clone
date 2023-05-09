from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length
from app.models import BusinessIamge

class BusinessImageForm(FlaskForm):
    url = StringField("url", validators=[DataRequired(), Length(min=1, max=2000, message="URL must be between 1 and 255 characters")])
    preview = BooleanField("preview")
    submit = SubmitField("submit")
