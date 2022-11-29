import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews"
import "./createReviews.css"

const CreateReviews = () => {
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(businessId);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState('');
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
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            review: review,
            rating: rating,
        };

        const errors = validations();
        if (errors.length) {
            setErrors(errors);
            return;
        }
        return dispatch(reviewActions.createReview(businessId, data)).then(
            async (res) => {
                setSubmitSuccess(true);
            }
        );
    };
    return (
        <div className="reviewContainer">
            <form className="businessReviews" onSubmit={handleSubmit}>
                <div className="reviewTitle">Create Your Review</div>
                {errors ?? (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    )
}