from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bookmark(db.Model):
    __tablename__ = "bookmarks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String, nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    #relationships
    business = db.relationship("Business", back_populates='bookmark')
    user = db.relationship("User", back_populates='bookmark')

    def to_dict(self):
        return {
            "id": self.id,
            # "name": self.name,
            "user": self.user.to_dict(),
            "business": self.business.to_dict(),
            "user_id": self.user_id,
            "business_id": self.business_id,
        }


# bookmarks = db.Table(
#     "bookmarks",
#     db.Model.metadata,
#     db.Column(db.Integer, primary_key=True),
#     # name = db.Column(db.String, nullable=False)
#     db.Column(db.Integer, db.ForeignKey('businesses.id')),
#     db.Column(db.Integer, db.ForeignKey('users.id')),
# )

# if environment == "production":
#     bookmarks.schema = SCHEMA
