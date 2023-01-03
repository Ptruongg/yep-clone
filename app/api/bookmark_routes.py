from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import User, Business, db, Bookmark
from app.forms import BookmarkForm
from werkzeug.utils import secure_filename
import os

bookmark_routes = Blueprint("bookmarks", __name__)

# get all bookmarks


@bookmark_routes.route("/")
def bookmarks():
    all_bookmarks = Bookmark.query.all()
    bookmarks = [bookmark.to_dict() for bookmark in all_bookmarks]
    response = {"bookmarks": bookmarks}
    return response

# get bookmark by id
# @bookmark_routes.route("/<int:id>")
# def bookmark_by_id():
#     one_bookmark = Bookmark.query.filter(Bookmark.id == id)
#     bookmark = [bookmark.to_dict() for bookmark in one_bookmark]
#     response = {"bookmark": bookmark}
#     return response

# get bookmark owned by a user

# @bookmark_routes.route("/user/<int:userId>")
# def user_bookmarks(userId):
#     userBookmark = Bookmark.query.filter(Bookmark.user_id == userId).all()
#     bookmarks = [bookmark.to_dict() for bookmark in userBookmark]
#     response = {"bookmarks": bookmarks}
#     return response
@bookmark_routes.route("/user/<int:userId>")
def user_bookmarks(userId):
    userBookmark = Bookmark.query.filter(Bookmark.user_id == userId).all()
    bookmarks = [bookmark.to_dict() for bookmark in userBookmark]
    response = {"bookmarks": bookmarks}
    return response

# create a bookmark

@bookmark_routes.route("/", methods=['POST'])
# @login_required
def create_bookmark():
    new_bookmark = BookmarkForm()
    new_bookmark["csrf_token"].data = request.cookies["csrf_token"]
    if new_bookmark.validate_on_submit():
        newBookmark = Bookmark(
            user_id=new_bookmark.data['user_id'],
            business_id=new_bookmark.data['business_id']
        )
        db.session.add(newBookmark)
        db.session.commit()
        return newBookmark.to_dict()
    else:
        return "Unauthorized", 403


# delete a bookmark
@bookmark_routes.route("/<bookmark_id>", methods=['DELETE'])
def delete_bookmark(bookmark_id):

    bookmark = Bookmark.query.get(bookmark_id)
    if not bookmark:
        return "The Bookmark you are looking for can not be found!", 404

    db.session.delete(bookmark)
    db.session.commit()

    return "Successfully Deleted"
