import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBusiness, getAllBusinesses, getBusinessDetails } from "../../store/businesses";
import { reviewsReducer, getBusinessReviewsThunk } from "../../store/reviews";
import "./businessDetails.css"

const BusinessDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(businessId);
    const businesses = useSelector((state) => state.businessReducer[businessId]);
    // console.log(businesses, "business")

    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => Object.values(state?.reviews));
    const reviewsString = JSON.stringify(reviews);
    // console.log(reviews)
    const user = useSelector((state) => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const businessString = JSON.stringify(businesses);
    const usersString = JSON.stringify(user);
    // const user = useSelector((state) => Object.values(state.users));
    // const reviews = useSelector((state) => state.reviewsReducer[review]);
    // const reviewsString = JSON.stringify(reviews)
    useEffect(() => {
        dispatch(getAllBusinesses());
    }, [dispatch])
    useEffect(() => {
        dispatch(getBusinessReviewsThunk())
    }, [dispatch, reviewsString])
    // useEffect(() => {
    //     dispatch(getAllUsers);
    // }, [dispatch, usersString])

    const handleEditClick = (e) => {
        e.preventDefault();
        history.push(`/business/${businessId}/edit`)
    }
    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteBusiness(businessId));
        history.push('/')
    }
    const handleCreateReview = (e) => {
        e.preventDefault();
        history.push(`/business/${businessId}/createReview`);
    };

    let business = business[businessId];
    const getBusinessReviews = reviews.filter((review) => {
        return review.businessId === businessId;
    });
    let allStars = 0;
    (getBusinessReviews || []).forEach((review) => {
        allStars += review.stars;
    });
    const avgStarRating = allStars / getBusinessReviews.length;

    return (
        // <div>hi</div>

        <div className="businessDetailPage">
            <div className="businessDetails">
                {businesses?.name}, {businesses?.description}, {businesses?.address}, {businesses?.city}, {businesses?.state}, {businesses?.zipcode}, {businesses?.country}, {businesses?.phoneNumber}
            </div>
            <div>
                {sessionUser && sessionUser.id === businesses?.user_id && (
                    <div className="editAndDeleteButtons">
                        <button className="editButton" onClick={handleEditClick}>
                            Edit Business
                        </button>
                        <button className="deleteButton" onClick={handleDeleteClick}>
                            Delete Business
                        </button>
                    </div>
                )}
            </div>
            <div className="businessReviews">
                <div className="reviewStars">
                    <div className="starIcon">{<i className="fas fa-star"></i>}</div>

                    <div className="circleBottom">
                        <i className="fas fa-circle"></i>{" "}
                    </div>

                    {sessionUser && (
                        <div>
                            <button className="reviewButton" onClick={handleCreateReview}>
                                Create Review
                            </button>
                        </div>
                    )}
                </div>

                {getBusinessReviewsThunk.map((review) => (
                    <div key={review.id}>
                       <div className="reviewContent"> Review: {review.review}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default BusinessDetails;
