

from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Business, db, Bookmark
from app.forms import BookmarkForm, search_form

from werkzeug.utils import secure_filename
import os

search_routes = Blueprint("search", __name__)



# get all bookmarks

@search_routes.route("/", methods=['GET'])
def search():
    all_searches = Search.query.all()
    bookmarks = [bookmark.to_dict() for bookmark in all_bookmarks]
    response = {"bookmarks": bookmarks}
    return response

#get all search results
@search_routes.route("/", methods=['POST'])
def search():
    new_search = search_form()
    new_search["csrf_token"].data = request.cookies["csrf_token"]
    data = new_search.data

    search = []

    if data["name"]:
        search.append(Business.name.ilike(f"%{data['name']}%"))
    if data["city"]:
        search.append(Business.city.ilike(f"%{data['city']}%"))
    if data["state"]:
        search.append(Business.state.ilike(f"%{data['state']}%"))

    searched_business = Business.query.filter(*search)
    search = [business.to_dict() for business in searched_business]
    return {"businesses": search}

