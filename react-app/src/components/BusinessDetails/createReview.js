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

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            review: review,
            rating: rating,
            user_id: user.id,
            business_id: businessId
        };

        if (review.length < 25 || review.length >= 255) {
            setErrors(["Review must be greater than 25 and less than 255 characters"])
            return;
        }
        if (rating > 5 || rating < 1) {
            setErrors(['Please enter a number from 1 to 5 stars'])
            return
        }

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
            <h2 className="reviewTitle">Create Your Review</h2>
            <form className="businessReviews" onSubmit={handleSubmit}>
                <div style={{color: "red"}}>
                    {errors ?? (
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error.split(':')[1]}</li>

                            ))}
                        </ul>
                    )}
                </div>
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
                            style={{ height: "90px", width: "500px" }}
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
                            style={{ height: "20px", width: "25%", marginTop: "10px" }}
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
