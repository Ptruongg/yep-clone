import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBusiness, getAllBusinesses, getBusinessDetails } from "../../store/businesses";
import { reviewsReducer, getBusinessReviewsThunk, getReviewsThunk } from "../../store/reviews";
import DeleteReviewModal from "../DeleteReview";
import "./businessDetails.css"
import DeleteReview from "../DeleteReview/DeleteReview";
import EditBusiness from "../EditBusiness/editBusiness";
import { getAllUsers } from "../../store/user";
import EditBusinessModal from "../EditBusiness";
import EditReviewModal from "../EditReview";

const BusinessDetails = ({ onClick }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(businessId);
    const businesses = useSelector((state) => state.businessReducer[businessId]);
    const allReviews = useSelector((state) => Object.values(state.reviewsReducer))
    const businessReviews = allReviews.filter(
        (review) => review.business_id === businessId
    )
    const allUsers = useSelector((state) => state.usersReducer)
    console.log('all usersssssss', allUsers)

    // const allUsers= useSelector((state) => Object.values(state.usersReducer))

    const sessionUser = useSelector((state) => state.session.user);
    // const reviews = useSelector((state) => Object.values(state?.reviews));
    // const reviewsString = JSON.stringify(reviews);

    const user = useSelector((state) => state.session.user);

    // const [isLoaded, setIsLoaded] = useState(false);
    const businessString = JSON.stringify(businesses);
    const usersString = JSON.stringify(user);
    // const user = useSelector((state) => Object.values(state.users));
    // const reviews = useSelector((state) => state.reviewsReducer[review]);
    // const reviewsString = JSON.stringify(reviews)
    useEffect(() => {
        dispatch(getAllBusinesses());
        dispatch(getReviewsThunk())
        dispatch(getAllUsers())
    }, [dispatch, JSON.stringify(businesses), JSON.stringify(allReviews)])
    // useEffect(() => {
    //     dispatch(getReviewsThunk())
    // }, [dispatch, businesses, JSON.stringify(businessReviews)])
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
    const fetchUserbyId = (userId) => {
        if(!user[userId]) {
            return ''
        } else {
            const firstName = user[userId].firstName
            return firstName
        }
    }
    console.log(businessReviews, 'ddddddddd')
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

        <div className="businessDetailPage">
            <div className="header">
                <h2>{businesses?.name}</h2>
                {sessionUser && sessionUser.id === businesses?.user_id && (
                    <div className="editAndDeleteButtons">
                        {/* <button className="editButton" onClick={handleEditClick}>
                            Edit Business
                        </button> */}
                        <button className="editButton">
                            <EditBusinessModal />
                        </button>
                        <button className="deleteButton" onClick={handleDeleteClick}>
                            Delete Business
                        </button>
                    </div>
                )}
            </div>
            <div className="businessImg">
                <img src={businesses?.imageUrl} className='images'></img>
            </div>
            <div className="businessDetails">
                <div className="about-content">
                    <div className="businessDescription">
                        <h2>About the Business</h2>
                        {businesses?.description}
                    </div>
                    <div className="location">
                        <h2>Location</h2>
                        {businesses?.address}, {businesses?.city}, {businesses?.state}, {businesses?.zipcode}, {businesses?.country}
                    </div>
                    <div className="phoneNumber">
                        <h2>Phone Number</h2>
                        {businesses?.phoneNumber}
                    </div>


                    <div className="businessReviews">
                        {/* <div className="reviewStars">
                    <div className="starIcon">{<i className="fas fa-star"></i>}</div>

                    <div className="circleBottom">
                        <i className="fas fa-circle"></i>{" "}
                    </div>

                </div> */}
                        <div className="reviews-header">
                            <h2>Reviews</h2>
                            {sessionUser && (
                                <div>
                                    <button className="reviewButton" onClick={handleCreateReview}>
                                        Create Review
                                    </button>
                                </div>
                            )}
                        </div>

                        {businessReviews.map((rev) => (
                            <div className="each-review-container" key={rev.id}>
                                <div className="userName">
                                   Name: {fetchUserbyId(rev.user_id)}
                                </div>
                                <div className="reviewContent">  {rev.review}</div>
                                <div className="rating">
                                    {rev.rating}
                                </div>
                                <div className="edit-review">
                                    <EditReviewModal reviewId={rev.id} businessId={businessId} />
                                </div>
                                <div className='delete-review' >
                                    <DeleteReviewModal reviewId={rev.id} businessId={businessId} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="busDetails-scroll">
                    <div className="side-bar">
                        <div className="address">
                        {businesses?.address}, {businesses?.city}, {businesses?.state}, {businesses?.zipcode}
                        <img src={'https://icons.veryicon.com/png/o/miscellaneous/basic-linear-icon/address-101.png'} style={{ width: "1.3em", marginLeft: "1.1em"}}/>
                        </div>
                        <div className="phone-Number">
                            {businesses?.phoneNumber}
                            <img src={'https://static.vecteezy.com/system/resources/previews/003/720/498/original/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BusinessDetails;
