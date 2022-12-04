import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { reviewsReducer } from '../../store/reviews'
import { editReviewThunk, getReviewsThunk } from '../../store/reviews'
import './editReview.css'

const EditReview = ({ reviewId, businessId, onClick }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const reviewState = useSelector((state) => state.reviewsReducer[reviewId]);
    console.log(reviewState, 'ssssssheeeeeeeesh')
    console.log(reviewId, 'siiiiiiiiiiiiiiiiick')
    const [review, setReview] = useState(reviewState?.review);
    const [rating, setRating] = useState(reviewState?.rating);
    const [errors, setErrors] = useState([]);

    const updatedReview = (e) => setReview(e.target.value);
    const updatedRating = (e) => setRating(e.target.value);


    useEffect(() => {
        const errorNotifications = [];

        if (!review) errorNotifications.push("Review is required")
        if (!rating) errorNotifications.push("Rating is required")

        setErrors(errorNotifications)

    }, [review, rating])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length > 0) {
            return;
        }

        if (review.length < 1) {
            setErrors(['Please enter in a valid review'])
            return;
        }

        let payload = {
            review,
            rating,
            user_id: user.id,
            business_id: businessId
        }

        await dispatch(editReviewThunk(payload, reviewState.id));
        dispatch(getReviewsThunk);
        onClick();
    }
    return (
        <div className='editReviewDiv'>

            <form className='review-form' onSubmit={handleSubmit}>
                {errors ?? (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div>
                    <h2>Edit your Review</h2>
                </div>
                <div className='review-inputs'>
                    <div>
                        <label>
                            Review:
                            <input
                                type="text"
                                value={review}
                                onChange={updatedReview}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Rating:
                            <input
                                type="number"
                                value={rating}
                                onChange={updatedRating}
                                min={1}
                                max={5}
                                required
                            />
                        </label>
                    </div>
                    <div className='edit-btn-div'>
                        <button className='submit-button' type="submit" onClick={handleSubmit} >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default EditReview;
