import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBusiness, getAllBusinesses, getBusinessDetails } from "../../store/businesses";
import { getAllUsers } from "../../store/user";
import "./businessDetails.css"

const BusinessDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(businessId);
    const businesses = useSelector((state) => state.businessReducer[businessId]);
    console.log(businesses, "business")

    const sessionUser = useSelector((state) => state.session.user);
    // const reviews = useSelector((state) => Object.values(state.reviews));
    const user = useSelector((state) => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const businessString = JSON.stringify(businesses);
    // const reviewsString = JSON.stringify(reviews);
    const usersString = JSON.stringify(user);
    // const user = useSelector((state) => Object.values(state.users));

    useEffect(() => {
        dispatch(getAllBusinesses());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsers);
    }, [dispatch, usersString])

    const handleEditClick = (e) => {
        e.preventDefault();
        history.push(`/business/${businessId}/edit`)
    }
    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteBusiness(businessId));
        history.push('/')
    }
    return (
        // <div>hi</div>

                <div className="businessDetailPage">
                    <div className="businessDetails">
                        {businesses?.name}, {businesses?.description}, {businesses?.address}, {businesses?.city}, {businesses?.state}, {businesses?.zipcode}, {businesses?.country}, {businesses?.phone_number}
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
                </div>
    )
}
export default BusinessDetails;
