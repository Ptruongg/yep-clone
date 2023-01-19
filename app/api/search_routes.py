from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import User, Business, db, Bookmark, Search
from app.forms import BookmarkForm
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
