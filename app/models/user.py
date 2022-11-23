from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_image = db.Column(db.String)

    business = db.relationship("Business", back_populates="user")
    review = db.relationship("Review", back_populates="user")
    # reviewImages = db.relationship("ReviewImage", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email
        }

    #relationships
    businesses = db.relationship("Business", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")


    def to_dict(self, businesses=False):
        userInfo = {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'hased_password': self.hashed_password,
            'user_image': self.user_image,
        }
        if businesses:
            userInfo['businesess'] = [buss.to_dict(images=True) for buss in self.businesses]
        return userInfo
