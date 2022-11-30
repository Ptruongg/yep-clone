import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as businessActions from "../../store/businesses";
import { getAllBusinesses } from "../../store/businesses";
import "./businessList.css";
import { NavLink } from "react-router-dom";


const BusinessesList = () => {
    const dispatch = useDispatch();
    const business = useSelector((state) => Object.values(state?.businessReducer));
    console.log(business, business)
    // const sessionUser = useSelector((state) => state.session.user)
    // const reviews = useSelector((state) => Object.values(state?.reviews))
    const buz = useSelector((state) => state)
    console.log('buz', buz)
    useEffect(() => {
        dispatch(getAllBusinesses())
    }, [dispatch, JSON.stringify(business)])

    // const allReviews = (businessId) => {
    //     const reviewsForBusinessId = reviews.filter((review) => {
    //         return review.businessId === businessId;
    //     })
    //     let stars = 0;
    //     reviewsForBusinessId.forEach((review) => {
    //         stars += reviews.rating;
    //     })
    //     const avgStarRating = stars / reviewsForBusinessId.length;
    //     return avgStarRating ? avgStarRating.toFixed(2) : "New";
    // }

    return (
        <div className="all-bussinesses">
            <div className="businesses">
                {business &&
                    business.map((bus) => (
                        <div className="busCard" key={bus.id}>
                            <div>
                                <NavLink to={`/business/${bus.id}`}>
                                    Business
                                </NavLink>
                                {bus.name}, {bus.description}, {bus.address}, {bus.city}, {bus.state}, {bus.zipcode}, {bus.country}, {bus.phoneNumber}
                                <img src={bus.imageUrl} className="businessImages"></img>
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    )
}

export default BusinessesList
