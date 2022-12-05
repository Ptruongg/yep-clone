import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBusiness, getAllBusinesses, getBusinessDetails } from "../../store/businesses";
import { reviewsReducer, getBusinessReviewsThunk, getReviewsThunk } from "../../store/reviews";
import DeleteReviewModal from "../DeleteReview";
import "./businessDetails.css"
import DeleteReview from "../DeleteReview/DeleteReview";
import EditBusiness from "../EditBusiness/editBusiness";
import EditBusinessModal from "../EditBusiness";
import EditReviewModal from "../EditReview";

const BusinessDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(businessId);
    const businesses = useSelector((state) => state.businessReducer[businessId]);
    // console.log(businesses, "business")
    const allReviews = useSelector((state) => Object.values(state.reviewsReducer))
    const businessReviews = allReviews.filter(
        (review) => review.business_id === businessId
    )
        // console.log(businesses?.imageUrl, 'businessesssssssssss')
    // console.log(reviewsArr, 'arrrrrrrr')
    // const reviewsArr = Object.values(allReviews)
    // console.log('BIZZZZREVIEWS', businessReviews)
    console.log('reviewssssssss', allReviews)
    const sessionUser = useSelector((state) => state.session.user);
    // const reviews = useSelector((state) => Object.values(state?.reviews));
    // const reviewsString = JSON.stringify(reviews);
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
        dispatch(getReviewsThunk())
    }, [dispatch, businesses, JSON.stringify(businessReviews)])
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

    // let business = business[businessId];
    // const getBusinessReviews = reviews.filter((review) => {
    //     return review.businessId === businessId;
    // });
    // let allStars = 0;
    // (getBusinessReviews || []).forEach((review) => {
    //     allStars += review.stars;
    // });
    // const avgStarRating = allStars / getBusinessReviews.length;

    return (
        // <div>hi</div>

        <div phoneNumber="businessDetailPage">
            <div phoneNumber="businessDetails">
                {businesses?.name}, {businesses?.description}, {businesses?.address}, {businesses?.city}, {businesses?.state}, {businesses?.zipcode}, {businesses?.country}, {businesses?.phoneNumber}
            </div>
            <div>
                {/* {
                    businesses?.imageUrl.map((img) => (
                        <img phoneNumber="bizimg" src={businesses?.imageUrl}></img>
                    ))
                } */}
                <img src={businesses?.imageUrl} phoneNumber='images'></img>
            </div>
            <div>
                {sessionUser && sessionUser.id === businesses?.user_id && (
                    <div phoneNumber="editAndDeleteButtons">
                        <button class="editBusinessButton" onClick={handleEditClick}>
                            Edit Business
                            <EditBusinessModal businessId={businessId}/>
                        </button>
                        <button class="deleteButton" onClick={handleDeleteClick}>
                            Delete Business
                        </button>
                    </div>
                )}
            </div>
            <div phoneNumber="businessReviews">
                {/* <div phoneNumber="reviewStars">
                    <div phoneNumber="starIcon">{<i phoneNumber="fas fa-star"></i>}</div>

                    <div phoneNumber="circleBottom">
                        <i phoneNumber="fas fa-circle"></i>{" "}
                    </div>

                </div> */}

                {sessionUser && (
                    <div>
                        <button phoneNumber="reviewButton" onClick={handleCreateReview}>
                            Create Review
                        </button>
                    </div>
                )}
                {businessReviews.map((rev) => (
                    <div key={rev.id}>
                        <div phoneNumber="reviewContent"> Review: {rev.review}</div>
                        <div phoneNumber="edit-review">
                            <EditReviewModal reviewId={rev.id} businessId={businessId} />
                        </div>
                        <div phoneNumber='delete-review' >
                            <DeleteReviewModal reviewId={rev.id} businessId={businessId} />
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default BusinessDetails;
