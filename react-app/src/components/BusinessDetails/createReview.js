import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews"
import "./createReviews.css"

const CreateReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { businessId } = useParams();
    businessId = Number(businessId);
    const business = useSelector((state) => state.businessReducer[businessId]);
    const user = useSelector((state) => state.session.user);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState('');

    const validations = () => {
        const errors = [];
        if (review.length < 5) {
            errors.push("Review must be greater than 5 characters")
        }
        if (rating > 5 || rating < 1) {
            errors.push('Please enter a number from 1 to 5 stars')
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            review: review,
            rating: rating,
            user_id: user.id,
            business_id: businessId
        };

        // const errors = validations();
        // if (errors.length) {
        //     setErrors(errors);
        //     return;
        // }
        let createdReview = await dispatch(reviewActions.createReviewThunk(data))
        if (createdReview) {
            history.push(`/business/${businessId}`)
        }
    };
    return (
        <div className="reviewContainer">
            <div>
            <h2>{business?.name}</h2>
            </div>
            <form className="businessReviews" onSubmit={handleSubmit}>
                <div className="reviewTitle">Create Your Review</div>
                {errors ?? (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div>
                    <div>
                        <label>
                            Review:
                        </label>
                        <input
                            type="text"
                            placeholder="Review Message"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Rating:
                        </label>
                        <input
                            type="number"
                            placeholder="Rating"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <button className="createReviewButton" type="submit" onClick={handleSubmit}>
                        Create Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateReviews;
