from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    # review_id = db.Column(db.Integer, db.ForeignKey('reviewImages.id'))

    user = db.relationship("User", back_populates='review', foreign_keys=[user_id])
    business = db.relationship("Business", back_populates="review", foreign_keys=[business_id])
    # reviewImage = db.relationship("ReviewImage", back_populates="review")

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "user_id": self.user_id,
            "business_id": self.business_id,
        }
