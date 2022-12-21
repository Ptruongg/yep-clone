# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Bookmark(db.Model):
#     __tablename__ = "bookmarks"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

#     #relationships
#     business = db.relationship("Business", back_populates='bookmark')
#     user = db.relationship("User", back_populates='bookmark')

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "business_id": self.business_id,
#             "user_id": self.user_id,
#         }
