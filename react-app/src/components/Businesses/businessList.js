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
        <div className="homepage">
            <div className="businesses-list">
                {business &&
                    business.map((bus) => (
                        <NavLink to={`/business/${bus.id}`}>
                            <div className="busCard" key={bus.id}>
                                <div className="businessDiv">
                                    <div className="businessImage" style={{fontFamily: "Times-new-roman"}}>
                                        <img src={bus.imageUrl} className="bizphoto"></img>
                                    </div>
                                    <div className="business-text">
                                        <div className="name">
                                            {bus.name}
                                        </div>
                                        <div className="address">
                                            {bus.address}, {bus.city}, {bus.state}, {bus.zipcode}, {bus.country}
                                        </div>
                                        <div className="phone-number">
                                            {bus.phoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
            </div>
        </div>
    )
}

export default BusinessesList
