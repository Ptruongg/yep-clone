from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .reviews import seed_reviews, undo_reviews
from .bookmarks import seed_bookmarks, undo_bookmarks
# Creates a seed group to hold our commands
from app.models.db import db, environment, SCHEMA
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_businesses()
        undo_reviews()

    seed_users()
    seed_businesses()
    seed_reviews()
    seed_bookmarks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_businesses()
    undo_reviews()
    undo_bookmarks()
    # Add other undo functions here
