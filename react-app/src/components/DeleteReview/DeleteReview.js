
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBusinessDetails } from "../../store/businesses";
import { deleteReviewThunk, getReviewsThunk } from "../../store/reviews";


function DeleteReview({reviewId, businessId, onClick}) {
    let dispatch = useDispatch();
    let history = useHistory();

    const handleDeleteClick = () => {
        dispatch(deleteReviewThunk(reviewId));
        // history.push(`/business/${businessId}`)
        dispatch(getReviewsThunk());
        dispatch(getBusinessDetails(businessId))
        onClick()

    };

    return (
        <div className="delete-post">
            <div className="delete-head">
                <h3 className="delete-top-modal">Delete post?</h3>
                <div className="confirmation-delete-msg">
                    Are you sure you want to delete this review?
                </div>
            </div>
            <div className="delete-btns-outer">
                {/* <div className="delete-option cancel" onClick={onClick}>
                    Cancel
                </div> */}
                <div className="delete-review-button">
                    <button style={{ borderRadius: "5em", color: "white", backgroundColor: "red" }} className='deleteComment' onClick={handleDeleteClick}>Delete</button>
                </div>

            </div>
        </div>
    );
}

export default DeleteReview;
