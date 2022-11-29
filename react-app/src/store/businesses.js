const GET_BUSINESS = 'businesses/GET_BUSINESS';
const GET_BUSINESS_DEATS = 'businesses/GET_BUSINESS_DEATS'
const ADD_BUSINESS = 'businesses/ADD_BUSINESS';
const EDIT_BUSINESS = 'businesses/EDIT_BUSINESS';
const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS';

//actions

const getBusinesses = (allBus) => {
    return {
        type: GET_BUSINESS,
        allBus
    }
}

const getBusinessId = (businessId) => {
    return {
        type: GET_BUSINESS_DEATS,
        businessId
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
    const response = await fetch(`/api/business/`)
    if (response.ok) {
        const business = await response.json();
        dispatch(getBusinesses(business))
        const all = {};
        business.businesses.forEach((business) => all[business.id] = business)
        return {...all}
    }
}

export const getBusinessDetails = (businessId) => async(dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`)
    if(response.ok) {
        const businessDeats = await response.json();
        dispatch(getBusinessId(businessDeats));
        return businessDeats;
    }
    return response
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
        case GET_BUSINESS: {
            let newState = {}
            action.allBus.businesses.forEach((business) => newState[business.id] = business)
            return newState
        }
        case GET_BUSINESS_DEATS: {
            const newState = {...state};
            newState[action.business.businessId] = action.business;
            return newState
        }
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
