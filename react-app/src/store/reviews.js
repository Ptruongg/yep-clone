const GET_ALL_REVIEWS = "/GET_ALL_REVIEWS";
const GET_BUSINESS_REVIEWS = "/GET_BUSINESS_REVIEWS";
const CREATE_REVIEWS = "/CREATE_REVIEWS";
const EDIT_REVIEWS = "/EDIT_REVIEWS";
const DELETE_REVIEWS = "/DELETE_REVIEWS";

//ACTIONS
const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

const getBusinessReviews = (reviews) => {
    return {
        type: GET_BUSINESS_REVIEWS,
        reviews
    }
}

const createReviews = (review) => {
    return {
        type: CREATE_REVIEWS,
        review
    }
}

const editReviews = (review) => {
    return {
        type: EDIT_REVIEWS,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEWS,
        reviewId
    }
}

//thunks

export const getReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/api/reviews")
    if(response.ok) {
        const allReviews = await response.json();
        dispatch(getAllReviews(allReviews))
        return allReviews
    }
    return response
}

export const getBusinessReviewsThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${businessId}`)
    if(response.ok) {
        const businessReviews = await response.json();
        dispatch(getBusinessReviews(businessReviews))
        return businessReviews
    }
    return response
}

export const createReviewThunk = (data) => async (dispatch) => {
    const {review, rating, user_id, business_id} = data

    const formData = new FormData()
    formData.append('review', review)
    formData.append('rating', rating)
    formData.append('user_id', user_id)
    formData.append('business_id', business_id)

    const response = await fetch(`/api/reviews/${data.business_id}/reviews`, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReviews(newReview));
        return newReview;
    }
    return response;
}

export const editReviewThunk = (review, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    })
    if(response.ok) {
        const editedReview = await response.json();
        dispatch(editReviews(review))
        return editedReview
    }
    return response;
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const deletedReview = await response.json();
        dispatch(deleteReview(deletedReview))

    }

}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_REVIEWS: {
            const newState = {};
            action.reviews.reviews.forEach(reviews => newState[reviews.id] = reviews);
            let reviews = {...newState}
            return reviews
        };
        case GET_BUSINESS_REVIEWS: {
            const newState = {};
            action.businessId.reviews.forEach(reviews => newState[reviews.id] = reviews)
            let reviews = {...newState}
            return reviews
        }
        case CREATE_REVIEWS: {
            const newState = {};
            newState[action.review.id] = action.review;
            return newState
        }
        case EDIT_REVIEWS: {
            const newState = {...state}
            newState[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEWS: {
            const newState = {...state}
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state;
    }
}
export default reviewsReducer
