from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business
from app.forms import BookmarkForm
from werkzeug.utils import secure_filename
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


from app.forms import NewSearchForm


search_routes = Blueprint("search", __name__)

engine = create_engine('sqlite:///database.db')
Session = sessionmaker(bind=engine)

# @search_routes.route('/')
# def search():
#     query = request.args.get('q')

#     session = Session()
#     results = session.query(Business).filter(Business.city.ilike(f'%{query}%')).all()
#     print(results, 'resultsbackend')
#     session.close()

#     search_results = [business.to_dict() for business in results]
#     return {"businesses": search_results}

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
