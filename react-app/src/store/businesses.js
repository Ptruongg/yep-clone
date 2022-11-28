const GET_BUSINESS = 'business/getBusinesses';
const ADD_BUSINESS = 'business/createBusiness';
const EDIT_BUSINESS = 'business/editBusiness';
const DELETE_BUSINESS = 'business/deleteBusiness';

//actions

const getBusinesses = (businesses) => {
    return {
        type: GET_BUSINESS,
        businesses
    }
}

const addBusiness = (business) => {
    return {
        type: ADD_BUSINESS,
        business
    }
}

const businessEdit = (business, businessId) => {
    return {
        type: EDIT_BUSINESS,
        business,
        businessId
    }
}

const businessDelete = (businessId) => {
    return {
        type: DELETE_BUSINESS,
        businessId
    }
}

//thunks

export const getAllBusinesses = () => async(dispatch) => {
    const response = await fetch(`/api/businesses`)
    const data = await response.json();
    if(!data.message) {
        dispatch(getBusinesses(data))
        return data;
    }
    else {
        dispatch(getBusinesses({ "businesses": []}))
    }
}

export const createBusiness = (business, businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    })
    if(response.ok) {
        const newBusiness = await response.json()
        dispatch(addBusiness(newBusiness))
        return newBusiness
    }
    return response
}

export const editBusiness = (business, businessId) => async(dispatch) => {
    const response = await fetch(`/api/business/${businessId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    })
    if (response.ok) {
        const editedBusiness = await response.json();
        dispatch(businessEdit(editedBusiness))
        return editedBusiness
    }
    return response;
}

export const deleteBusiness = (businessId) => async(dispatch) => {
    const response = await fetch(`/ap/business/${businessId}`, {
        method: 'DELETE',
    });
    if(response.ok) {
        dispatch(businessDelete(businessId))
    }
}

//reducer

const initialState = {}

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BUSINESS:
            let newState = {}
            action.business.forEach((business) => newState[business.id] = business)
            return newState
        case ADD_BUSINESS: {
            let newState = { ...state };
            newState[action.business.id] = action.business
            return newState
        }
        case EDIT_BUSINESS: {
            let newState = { ...state };
            newState[action.business.id] = action.business
            return newState
        }
        case DELETE_BUSINESS: {
            let newState = { ...state };
            delete newState[action.business.id];
            return newState;
        }
        default:
            return state
    }

}

export default businessReducer;
