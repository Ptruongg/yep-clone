from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import User, Business, db, Bookmark
from app.forms import BusinessForm
from werkzeug.utils import secure_filename
import os

bookmark_routes = Blueprint("bookmarks", __name__)

#get all bookmarks

@bookmark_routes.route("/")
def bookmarks():
    all_bookmarks = Bookmark.query.all()
    bookmarks = [bookmark.to_dict() for bookmark in all_bookmarks]
    response = {"bookmarks": bookmarks}
    return response

#get bookmark by id
# @bookmark_routes.route("/<int:id>")
# def bookmark_by_id():
#     one_bookmark = Bookmark.query.filter(Bookmark.id == id)
#     bookmark = [bookmark.to_dict() for bookmark in one_bookmark]
#     response = {"bookmark": bookmark}
#     return response

#get bookmark owned by a user
@bookmark_routes.route("user/<int:userId>/")
def user_bookmarks(userId):
    user_bookmark = Bookmark.query.filter(Bookmark.user_id == userId).all()
    bookmark = [bookmark.to_dict() for bookmark in user_bookmark]
    response = {"bookmarks": bookmark}
    return response

#create a bookmark
@bookmark_routes.route("/<int:id>/bookmarks/<int:id2>", methods=['POST'])
@login_required
def create_bookmark(id, id2):
    curr_user = User.query.get(id)
    bookmark = Business.query.get(id2)

    bookmark.business_bookmarks.append(curr_user)
    db.session.commit()
    user_appinfo = db.session.query(bookmarks).filter_by(user_id = id).all()
    print("APPINFO", user_appinfo)
    newObj = {"business_ids": []}
    for x,z in user_appinfo:
        if x == id:
            newObj["business_ids"].append(z)
    return newObj

@bookmark_routes.route("/<int:id>/appreciates/<int:id2>", methods=['DELETE'])
def delete_bookmark(id, id2):
    curr_user = User.query.get(id)
    bookmark = Business.query.get(id2)

    bookmark.project_bookmarks.remove(curr_user)
    db.session.commit()
    user_appinfo = db.session.query(bookmark).filter_by(user_id = id).all()
    newObj = {"business_ids": []}
    for x,z in user_appinfo:
        if x == id:
            newObj["project_ids"].append(z)
    return newObj
