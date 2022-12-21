from .db import db, environment, SCHEMA, add_prefix_for_prod

# bookmarks = db.Table(
#     "bookmarks",
#     db.Model.metadata,
#     db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
#     db.Column("business_id", db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id"))),
# )
# if environment == 'production':
#     bookmarks.schema = SCHEMA

class Business(db.Model):
    __tablename__ = "businesses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    phoneNumber = db.Column(db.String, nullable=False)
    imageUrl = db.Column(db.String, nullable=False)

    #relationships
    user = db.relationship("User", back_populates='business')
    review = db.relationship("Review", back_populates='business', cascade="all, delete")
    business_bookmarks = db.relationship("Bookmark", back_populates='business')

    def to_dict(self):
        print(self.business_bookmarks)
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "country": self.country,
            "user_id": self.user_id,
            "phoneNumber": self.phoneNumber,
            "imageUrl": self.imageUrl,
            "user": self.user.to_dict()
        }
