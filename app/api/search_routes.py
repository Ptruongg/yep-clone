from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Business, db, Bookmark
from app.forms import BookmarkForm, search_form
from werkzeug.utils import secure_filename
import os

search_routes = Blueprint("search", __name__)

#get all search results
@search_routes.route("/", methods=['POST'])
def search():
    new_search = search_form()
    new_search["csrf_token"].data = request.cookies["csrf_token"]
    data = new_search.data

    search = []

    if data["name"]:
        search.append(Business.name)
