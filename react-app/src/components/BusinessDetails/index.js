import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getAllBusinesses } from "../../store/spots";
import { getBusinessDetails } from "../../store/businesses";
import { getAllUsers } from "../../store/user";
import "./businessDetails.css"

const BusinessDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(spotId);
    const businesses = useSelector((state) => state.businesses);
    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const users = useSelector((state) => state.users);
    const [isLoaded, setIsLoaded] = useState(false);
    const businessString = JSON.stringify(businesses);
    const reviewsString = JSON.stringify(reviews);
    const usersString = JSON.stringify(users);
    const user = useSelector((state) => Object.values(state.users));

    useEffect(() => {
        dispatch(getBusinessDetails);
        setIsLoaded(true);
        if (isLoaded && businesses && businesses[businessId] === undefined) {
            history.push("/");
        }
    }, [dispatch, businessString])

    useEffect(() => {
        dispatch(getAllUsers);
    }, [dispatch, usersString])

    const handleEditClick = (e) => {
        e.preventDefault();
        history.push(`/business/${businessId}/edit`)
    }


}
