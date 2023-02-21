from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Business, db, Bookmark
from app.forms import BookmarkForm
from werkzeug.utils import secure_filename

from app.models import db, Business
from app.forms import NewSearchForm


search_routes = Blueprint("search", __name__)

# get search results
@search_routes.route("/", methods=["POST"])
def search_results():
    form = NewSearchForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data

    search_query = []

    if data["name"]:
        search_query.append(Business.name.ilike(f'%{data["name"]}%'))
    if data["city"]:
        search_query.append(Business.city.ilike(f'%{data["city"]}%'))
    if data["state"]:
        search_query.append(Business.state.ilike(f'%{data["state"]}%'))

    specific_businesses = Business.query.filter(*search_query)

    search_results = [business.to_dict() for business in specific_businesses]
    return {"businesses": search_results}
