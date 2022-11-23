# from .db import db

# class ReviewImage(db.Model):
#     __tablename__ = "reviewImages"

#     id = db.Column(db.Integer, primary_key=True)
#     business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
#     review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     url = db.Column(db.String)


#     reviews = db.relationship('Review', back_populates='reviewImage', foreign_keys=[review_id])
#     business = db.relationship('Business', back_populates='reviewImage', foreign_keys=[business_id])
#     user = db.relationship('User', back_populates='reviewImage', foreign_keys=[user_id])
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "review_id": self.review_id,
#             "business_id": self.business_id,
#             "url": self.url,
#         }
