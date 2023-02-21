import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as businessActions from "../../store/businesses";
import { getAllBusinesses } from "../../store/businesses";
import "./businessList.css";
import { NavLink } from "react-router-dom";
import Search from "../SearchBusiness";
import SearchBusiness from "../SearchBusiness";
import Footer from "../Footer";
import Home from "../GoogleMaps"


const BusinessesList = () => {
    const dispatch = useDispatch();
    const business = useSelector((state) => Object.values(state?.businessReducer));
    const [url, setUrl] = useState('https://photos.smugmug.com/photos/i-ZcW3j56/0/X4/i-ZcW3j56-X4.jpg');
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const images = ['https://photos.smugmug.com/photos/i-Vhwkfx6/0/X2/i-Vhwkfx6-X2.jpg', 'https://i.imgur.com/fXZuXu8.jpg', 'https://photos.smugmug.com/photos/i-6m22HpM/0/X2/i-6m22HpM-X2.jpg', 'https://photos.smugmug.com/photos/i-Sn8rswX/1/X4/i-Sn8rswX-X4.jpg'];
        let scroll = setInterval(() => {
            if (index === 3) {
                setIndex(0)
            }
            else {
                setIndex((index) => index + 1)
            }
            return setUrl(images[index])
        }, 4000)
        return () => clearInterval(scroll)
    }, [index, url])

    // const sessionUser = useSelector((state) => state.session.user)
    // const reviews = useSelector((state) => Object.values(state?.reviews))
    // const buz = useSelector((state) => state)
    // console.log('buz', buz)
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


            <div className="website-description">Yep is a Yelp clone that has core CRUD features for Businesses and Reviews</div>
            <div className="header">
                <img src={url} alt="" className="image-scroll"></img>
            </div>
            <h2 className='your-next-review'>Your Next Review Awaits</h2>
            <div className="businesses-list">
                {business &&
                    business.map((bus) => (
                        <NavLink to={`/business/${bus.id}`} key={bus.id}>
                            <div className="busCard">
                                <div className="businessDiv">
                                    <div className="businessImage" style={{ fontFamily: "Times-new-roman" }}>
                                        <img src={bus.imageUrl} className="bizphoto" onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src =
                                                "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                        }}></img>
                                    </div>
                                    <div className="business-text">
                                        <div className="name">
                                            {bus.name}
                                        </div>
                                        <div className="address">
                                            {bus.address}, {bus.city}, {bus.state}, {bus.zipcode}, {bus.country}
                                            <img src={'https://icons.veryicon.com/png/o/miscellaneous/basic-linear-icon/address-101.png'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                                        </div>
                                        <div className="phone-number">
                                            {bus.phoneNumber}
                                            <img src={'https://static.vecteezy.com/system/resources/previews/003/720/498/original/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
            </div>
            <div>
                <Footer />
            </div>
        </div>

    )
}


export default BusinessesList
