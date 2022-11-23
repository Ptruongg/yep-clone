from .db import db, environment, SCHEMA, add_prefix_for_prod

class Business(db.Model):
    __tablename__ = "business"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)

    #relationships
    user = db.relationship("User", back_populates='business')
    review = db.relationship("Review", back_populates='business', cascade="all, delete")

    def to_dict(self):
        return
