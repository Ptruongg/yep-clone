import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBusiness, getAllBusinesses, getBusinessDetails } from "../../store/businesses";
import { reviewsReducer, getBusinessReviewsThunk, getReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import { addBookmarksThunk, getBookmarksThunk, bookmarksReducer, getUserBookmarksThunk, removeBookmarksThunk } from "../../store/bookmarks";
import DeleteReviewModal from "../DeleteReview";
import "./businessDetails.css"
import DeleteReview from "../DeleteReview/DeleteReview";
import EditBusiness from "../EditBusiness/editBusiness";
// import { getAllUsers } from "../../store/user";
import EditBusinessModal from "../EditBusiness";
import EditReviewModal from "../EditReview";

const BusinessDetails = () => {
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



    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setBookmarked] = useState(false)
    // console.log('bizzzzzzz', businessReviews)

    // const allUsers= useSelector((state) => Object.values(state.usersReducer))

    const sessionUser = useSelector((state) => state.session.user);
    // console.log('session user', sessionUser)
    const businessString = JSON.stringify(businesses);
    const bookmarks = useSelector((state) => Object.values(state.bookmarksReducer))
    const bookmark = useSelector((state) => state.bookmarksReducer)
    useEffect(() => {
        dispatch(getAllBusinesses());
        dispatch(getReviewsThunk())
        dispatch(getBookmarksThunk())
        // dispatch(userHasBookmarked())
        // setIsLoaded(true)
        // dispatch(getAllUsers())
    }, [dispatch, JSON.stringify(businesses), JSON.stringify(allReviews), JSON.stringify(bookmarks)])


    useEffect(() => {
        Object.values(bookmarks).forEach((bookmark) => {
            // if (bookmark.user_id === sessionUser.id) {
            setIsLiked(true);
            setBookmarked(true)
            return
            // }
        })
    }, [bookmarks])

    const addBookmark = async (businesses, isLiked) => {
        const payload = {
            business_id: businesses.id,
            user_id: sessionUser.id
        }

        await dispatch(addBookmarksThunk(payload));
        // dispatch(getBookmarksThunk())
        dispatch(getUserBookmarksThunk(sessionUser.id))
        isLiked = true
        history.push(`/bookmarks/user/${sessionUser.id}`)
    }
    // const userHasBookmarked = () => {
    //     for (let i = 0; i < bookmarks.length; i++) {
    //         if (sessionUser.id === bookmarks.business[i].user_id) {
    //             setIsLiked(true)
    //             return
    //         }
    //     }
    // }
    // useEffect(() => {
    //     dispatch(getReviewsThunk())
    // }, [dispatch, businesses, JSON.stringify(businessReviews)])
    // useEffect(() => {
    //     dispatch(getAllUsers);
    // }, [dispatch, usersString])
    // const handleBookmarked = (e) => {
    //     e.preventDefault();
    //     setBookmarked(true)
    //     history.push(`/bookmarks/user/${user}`)
    // }
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
    // console.log('bbizzzzzzzzzzzzz', bookmarks)
    // // console.log('ssssssssssseee', sessionUser)
    // console.log('userId', sessionUser?.id)
    // console.log('bookmarkssssss', bookmarks[0].user_id)
    // const fetchUserbyId = (user_id) => {
    //     if (!allUsers[user_id]) {
    //         return ''
    //     } else {
    //         const firstName = allUsers[user_id].first_name
    //         const lastName = allUsers[user_id].last_name
    //         return [firstName, ' ', lastName]
    //     }
    // }
    // console.log(businessReviews, 'ddddddddd')

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
                {/* <div className="name">{businesses?.name}</div> */}
                <img src={businesses?.imageUrl} className='images' onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                        "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                }}>
                </img>
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
                    <section
                        className="amenitiesNmore"
                        aria-label="Amenities and More"
                    >
                        <div class="amenitiesFirst">
                            <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                <h2 class="interactive-map-h2">Amenities and More</h2>
                            </div>
                        </div>
                        <div class=" border-color--default__09f24__NPAKY">
                            <div
                                class=" border-color--default__09f24__NPAKY"
                                role="region"
                                aria-live="polite"
                                id="expander-link-content-17ce30f0-b669-4d8e-b715-0e1a946dd47b"
                            >
                                <div class=" margin-b3__09f24__l9v5d border-color--default__09f24__NPAKY">
                                    <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo layout-wrap__09f24__GEBlv layout-2-units__09f24__PsGVW border-color--default__09f24__NPAKY">
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-medical-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M15 22H9a1 1 0 01-1-1v-5H3a1 1 0 01-1-1V9a1 1 0 011-1h5V3a1 1 0 011-1h6a1 1 0 011 1v5h5a1 1 0 011 1v6a1 1 0 01-1 1h-5v5a1 1 0 01-1 1zm-5-2h4v-5a1 1 0 011-1h5v-4h-5a1 1 0 01-1-1V4h-4v5a1 1 0 01-1 1H4v4h5a1 1 0 011 1v5z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Health Score
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-order-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M23.596 17a4.97 4.97 0 00-1.836-3.839L17.753 4.77a1.114 1.114 0 00-.464-.53.983.983 0 00-.432-.124c-.013 0-.023-.008-.036-.008h-4.843a1 1 0 000 2h1.656a3.534 3.534 0 00-.09 3.006l1.817 4.107A5.018 5.018 0 0013.703 16H9.748a2.537 2.537 0 01-1.488-2.107c0-1.486 1.971-1.895 2.05-1.91a1 1 0 00.815-.983V9a.998.998 0 00-1-1h-2.03V5a3.003 3.003 0 00-3-3H1.38a1 1 0 00-1 1v8a1 1 0 001 1h.28a6.56 6.56 0 00-1.115 5.203.99.99 0 00.807.77c0 .01-.005.017-.005.027a4.056 4.056 0 108.11 0h5.06a4.055 4.055 0 108.109 0l-.001-.006a.996.996 0 00.97-.994zM9.125 10v.249a3.987 3.987 0 00-2.865 3.644A3.909 3.909 0 006.86 16H2.405a4.571 4.571 0 011.621-3.646 1 1 0 00-.079-1.587L2.832 10h6.293zM2.38 4h2.715a1 1 0 011 1v3H2.832c-.153.007-.305.03-.452.072V4zM5.4 20.056A2.058 2.058 0 013.347 18h4.11a2.058 2.058 0 01-2.056 2.056zM21.425 16h-5.658a3.001 3.001 0 015.658 0zm-5.93-9.182c.175-.273.431-.484.732-.603l2.783 5.827c-.14-.012-.272-.042-.414-.042-.502.007-1 .09-1.477.248l-1.744-3.943a1.54 1.54 0 01.12-1.487zm3.076 13.238A2.058 2.058 0 0116.517 18h4.109a2.058 2.058 0 01-2.055 2.056z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Offers Delivery
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-shopping-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M22 7h-5.177l-1.16-4.33a1 1 0 10-1.931.518L14.752 7H9.228l1.021-3.812a1.002 1.002 0 00-1.096-1.254 1 1 0 00-.836.737L7.157 7H2a1 1 0 00-1 1v4a1 1 0 001 1h.88l1.318 6.588A3.006 3.006 0 007.14 22h9.72a3.006 3.006 0 002.942-2.411L21.12 13H22a1 1 0 001-1V8a.998.998 0 00-1-1zm-4.16 12.197a1.001 1.001 0 01-.98.803H7.14a1.001 1.001 0 01-.98-.804L4.92 13h14.16l-1.24 6.197zM21 11H3V9h3.621l-.056.209a1 1 0 101.932.518L8.692 9h6.596l.215.8a1 1 0 001.932-.517L17.359 9H21v2z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Offers Takeout
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-checkmark-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M9.46 17.52a1 1 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.25 3.26 8.33-8.34a1.004 1.004 0 011.42 1.42l-9 9a1 1 0 01-.71.37z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Masks required
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-checkmark-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M9.46 17.52a1 1 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.25 3.26 8.33-8.34a1.004 1.004 0 011.42 1.42l-9 9a1 1 0 01-.71.37z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Accepts Credit Cards
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-checkmark-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M9.46 17.52a1 1 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.25 3.26 8.33-8.34a1.004 1.004 0 011.42 1.42l-9 9a1 1 0 01-.71.37z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Accepts Apple Pay
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-close-v2 css-xxqqxs"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M13.41 12l5.3-5.29a1.004 1.004 0 10-1.42-1.42L12 10.59l-5.29-5.3a1.004 1.004 0 00-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 000 1.42 1 1 0 001.42 0l5.29-5.3 5.29 5.3a1 1 0 001.42 0 1 1 0 000-1.42L13.41 12z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span class=" css-qyp8bo" data-font-weight="semibold">
                                                        Accepts Android Pay
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                            <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                                <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                                    <span
                                                        alt=""
                                                        aria-hidden="true"
                                                        role="img"
                                                        class="icon--24-outdoor-seating-v2 css-106vfgv"
                                                    >
                                                        <svg width="24" height="24" class="icon_svg">
                                                            <path d="M7 22H3.516a1 1 0 01-.965-.737l-1.5-5.52a1 1 0 011.93-.525L4.28 20H7a1 1 0 010 2zm13.516 0H17a1 1 0 110-2h2.751l1.3-4.782a1 1 0 011.93.525l-1.5 5.52a1 1 0 01-.965.737zm1.975-13.985L12.477 2.126a1.001 1.001 0 00-1.015.001L1.477 8.016a1.001 1.001 0 00-.493.861v2.03a.999.999 0 00.465.845 7.202 7.202 0 003.859 1.114 7.143 7.143 0 003.36-.833 7.093 7.093 0 002.348.748V16H7a1 1 0 100 2h4.016v3.012a1 1 0 002 0V18H17a1 1 0 000-2h-3.984v-3.23a7.076 7.076 0 002.292-.738 7.21 7.21 0 007.212-.28.999.999 0 00.464-.845v-2.03a1 1 0 00-.493-.862zm-1.507 2.31a5.206 5.206 0 01-5.09-.262.823.823 0 00-.09-.051.998.998 0 00-1.044.025 5.113 5.113 0 01-5.546 0 1.122 1.122 0 00-1.14.025 5.21 5.21 0 01-5.09.262v-.876l8.987-5.3 9.013 5.301v.875z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                                    <span
                                                        class=" css-1p9ibgf"
                                                        data-font-weight="semibold"
                                                    >
                                                        Outdoor Seating
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="amenitiesSecond">

                            <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                        <span
                                            alt=""
                                            aria-hidden="true"
                                            role="img"
                                            class="icon--24-professional-v2 css-106vfgv"
                                        >
                                            <svg width="24" height="24" class="icon_svg">
                                                <path d="M22 6h-5V3a1 1 0 00-1-1H8a1 1 0 00-1 1v3H2a1 1 0 00-1 1v11a4 4 0 004 4h14a4 4 0 004-4V7a1 1 0 00-1-1zM9 4h6v2H9V4zM8 8h13v3H3V8h5zm2 5h4v2h-4v-2zm9 7H5a2 2 0 01-2-2v-5h5v3a1 1 0 001 1h6a1 1 0 001-1v-3h5v5a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                        <span
                                            class=" css-1p9ibgf"
                                            data-font-weight="semibold"
                                        >
                                            Good for Working
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                        <span
                                            alt=""
                                            aria-hidden="true"
                                            role="img"
                                            class="icon--24-parking-v2 css-106vfgv"
                                        >
                                            <svg width="24" height="24" class="icon_svg">
                                                <path d="M12 1a11 11 0 0111 11c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 20a9 9 0 100-18 9 9 0 000 18zm.5-14a3.5 3.5 0 010 7H11v2.5a1 1 0 01-2 0V8a1 1 0 011-1h2.5zm0 5a1.5 1.5 0 000-3H11v3h1.5z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                        <span
                                            class=" css-1p9ibgf"
                                            data-font-weight="semibold"
                                        >
                                            Street Parking
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                        <span
                                            alt=""
                                            aria-hidden="true"
                                            role="img"
                                            class="icon--24-wifi-v2 css-106vfgv"
                                        >
                                            <svg width="24" height="24" class="icon_svg">
                                                <path d="M13.41 18.39a2 2 0 11-2.827-2.83 2 2 0 012.827 2.83zM17 15.31a1 1 0 01-.71-.29 6 6 0 00-8.48 0 1.022 1.022 0 11-1.47-1.42 8 8 0 0111.32 0 1 1 0 01-.66 1.71zm2.54-2.59a1 1 0 01-.71-.29 9.66 9.66 0 00-13.66 0A1.008 1.008 0 113.75 11c4.564-4.538 11.936-4.538 16.5 0a1 1 0 010 1.42 1 1 0 01-.71.3zm2.17-2.67a1 1 0 01-.71-.29 12.72 12.72 0 00-18 0 1.004 1.004 0 11-1.42-1.42c5.758-5.747 15.082-5.747 20.84 0a1 1 0 01-.71 1.71z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                        <span
                                            class=" css-1p9ibgf"
                                            data-font-weight="semibold"
                                        >
                                            Free Wi-Fi
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                        <span
                                            alt=""
                                            aria-hidden="true"
                                            role="img"
                                            class="icon--24-wheelchair-v2 css-106vfgv"
                                        >
                                            <svg width="24" height="24" class="icon_svg">
                                                <path d="M22.83 16.64L21 13.9a2 2 0 00-1.67-.9H18v-2.89A3.11 3.11 0 0014.89 7H8V5.66A4.17 4.17 0 003.84 1.5a1 1 0 100 2A2.16 2.16 0 016 5.66v5.55A6 6 0 1012.61 15H16v4a2.38 2.38 0 00-.4.31 2 2 0 102.83 0A2.18 2.18 0 0018 19v-4h1.36l1.81 2.74a1 1 0 101.66-1.1zM7 21.12a4 4 0 110-8 4 4 0 010 8zM11.53 13a.66.66 0 00-.15 0A6 6 0 008 11.21V9h6.89c.613 0 1.11.497 1.11 1.11V13h-4.47z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                        <span
                                            class=" css-1p9ibgf"
                                            data-font-weight="semibold"
                                        >
                                            Wheelchair Accessible
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                        <span
                                            alt=""
                                            aria-hidden="true"
                                            role="img"
                                            class="icon--24-close-v2 css-xxqqxs"
                                        >
                                            <svg width="24" height="24" class="icon_svg">
                                                <path d="M13.41 12l5.3-5.29a1.004 1.004 0 10-1.42-1.42L12 10.59l-5.29-5.3a1.004 1.004 0 00-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 000 1.42 1 1 0 001.42 0l5.29-5.3 5.29 5.3a1 1 0 001.42 0 1 1 0 000-1.42L13.41 12z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                        <span class=" css-qyp8bo" data-font-weight="semibold">
                                            Dogs Not Allowed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                <div class=" arrange__09f24__LDfbs gutter-2__09f24__CCmUo vertical-align-baseline__09f24__fA6Jk border-color--default__09f24__NPAKY">
                                    <div class=" arrange-unit__09f24__rqHTg border-color--default__09f24__NPAKY">
                                        <span
                                            alt=""
                                            aria-hidden="true"
                                            role="img"
                                            class="icon--24-bicycle-v2 css-106vfgv"
                                        >
                                            <svg width="24" height="24" class="icon_svg">
                                                <path d="M18.22 11.5h-.31l-2.07-7.6a2 2 0 00-1.92-1.4H12a1 1 0 100 2h1.91l1.14 4.17c-2.06.4-3.12 2-4.07 3.44-.34.54-.711 1.06-1.11 1.56a2.34 2.34 0 00-.25-.3L8.25 9a1 1 0 100-2h-3.5a1 1 0 100 2h1.4L7 11.67a4.92 4.92 0 00-1.22-.17 5 5 0 105 5 4.37 4.37 0 00-.09-.81 13.59 13.59 0 002-2.5c1-1.5 1.65-2.42 2.92-2.6l.4 1.47a5 5 0 102.24-.56h-.03zm-12.44 8A3 3 0 118.33 15a5.21 5.21 0 01-2.51.56 1 1 0 000 2A7.52 7.52 0 008.73 17a3 3 0 01-2.95 2.5zm12.44 0a3 3 0 01-1.7-5.5l.75 2.76a1 1 0 001 .73c.09.01.18.01.27 0a1 1 0 00.7-1.23l-.75-2.75a3.002 3.002 0 01-.23 6l-.04-.01z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class=" arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG border-color--default__09f24__NPAKY">
                                        <span
                                            class=" css-1p9ibgf"
                                            data-font-weight="semibold"
                                        >
                                            Bike Parking
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="businessReviews">
                        <div className="reviews-header">
                            <h2>Reviews ({businessReviews.length})</h2>
                            {/* <div>
                                {bookmarks && !isBookmarked ? (

                                        < div >
                                            <button className="bookmarkButton" onClick={() => addBookmark(businesses, isLiked)}>
                                                Bookmark
                                            </button>
                                        </div>

                                ) : (<div> You have already bookmarked this business </div>)}
                            </div> */}
                            <div className="bookmarks-div">

                                {/* {sessionUser && (

                                    <button
                                        onClick={() => addBookmark(businesses, isLiked)}

                                    >Add Bookmark</button>
                                )} */}
                                {bookmarks && isBookmarked ? (
                                    <button
                                        onClick={() => addBookmark(businesses, isLiked)}

                                    >Add Bookmark</button>
                                ) : (
                                    <i
                                        style={{ color: "rgb(249, 24, 128)" }}
                                        onClick={() => removeBookmarksThunk(bookmark)}

                                    >Removed</i>
                                )}
                            </div>

                        </div>
                        {sessionUser && (
                            <>
                                <div className="bookmark-div">

                                    <div>
                                        <button className="reviewButton" onClick={handleCreateReview}>
                                            Create Review
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {businessReviews.map((rev) => (

                        <div className="each-review-container" key={rev.id}>
                            <div className="userName">
                                {rev?.user?.first_name}  {rev?.user?.last_name}
                            </div>

                            <div className="reviewContent">
                                {rev.review}
                                {sessionUser && sessionUser.id === rev.user_id && (
                                    <div className="edit-n-delete-buttons">
                                        <div className="edit-review" style={{ justifycontent: "center", alignitems: "center" }}>
                                            <EditReviewModal reviewId={rev.id} businessId={businessId} />
                                        </div>
                                        <div className='delete-review' style={{ justifycontent: "center", alignitems: "center" }} >
                                            <DeleteReviewModal reviewId={rev.id} businessId={businessId} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="stars">
                                <div className="starIcon" style={{ marginright: '10px' }}>{<i className="fas fa-star"></i>}</div>
                                <div className="rating">
                                    {rev.rating}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="busDetails-scroll">
                <div className="side-bar">
                    <div className="address">
                        {businesses?.address}, {businesses?.city}, {businesses?.state}, {businesses?.zipcode}
                        <img src={'https://icons.veryicon.com/png/o/miscellaneous/basic-linear-icon/address-101.png'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                    </div>
                    <div className="phone-Number">
                        {businesses?.phoneNumber}
                        <img src={'https://static.vecteezy.com/system/resources/previews/003/720/498/original/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                    </div>
                </div>
            </div>

        </div>


    )
}

export default BusinessDetails;
