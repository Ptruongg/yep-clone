
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewThunk } from "../../store/reviews";

function DeleteReview({reviewId, businessId}) {
    let dispatch = useDispatch();
    let history = useHistory();

    const handleDeleteClick = () => {
        dispatch(deleteReviewThunk(reviewId));
        history.push(`/business/${businessId}`)
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
                {/* <button className="delete-option delete-button" onClick={onDelete}>
                    Delete
                </button> */}
            </div>
        </div>
    );
}

export default DeleteReview;
