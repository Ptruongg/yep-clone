const GET_BUSINESS = 'businesses/GET_BUSINESS';
const GET_BUSINESS_DEATS = 'businesses/GET_BUSINESS_DEATS';
const GET_ALL_BUSINESS_IMAGES = 'businesses/GET_ALL_BUSINESS_IMAGES';
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

const getAllBusinessImagesAction = (payload) => {
    return {
        type: GET_ALL_BUSINESS_IMAGES,
        payload
    }
}

const addBusiness = (business) => {
    return {
        type: ADD_BUSINESS,
        business
    }
}

const businessEdit = (business) => {
    return {
        type: EDIT_BUSINESS,
        business

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
    const response = await fetch(`/api/businesses/`)
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

export const getAllBusinessImages = () => async(dispatch) => {
    const response = await fetch("/api/businesses/images")

    if (response.ok) {
        const allBusinessImages = await response.json();
        dispatch(getAllBusinessImagesAction(allBusinessImages))
    }
}

export const createBusinessImages = (images, businessId) => async(dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(images)
    })
    if (response.ok) {
        const data = await response.json()
        return data
    } else if (response.status < 500) {
        const data = await response.json()
        if(data.errors) return data
    }
}

export const createBusiness = (data) => async (dispatch) => {
    const {name, description, address, city, state, zipcode, country, phoneNumber, user_id, imageUrl} = data

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('zipcode', zipcode)
    formData.append('country', country)
    formData.append('phoneNumber', phoneNumber)
    formData.append('user_id', user_id)
    formData.append('imageUrl', imageUrl)

    const response = await fetch(`/api/businesses/`, {
        method: 'POST',
        body: formData
    })

    if (response.ok) {
        const newBusiness = await response.json();
        dispatch(addBusiness(newBusiness));
        return newBusiness;
    }


    // const response = await fetch(`/api/business/`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(business)
    // })
    // if(response.ok) {
    //     const newBusiness = await response.json()
    //     dispatch(addBusiness(newBusiness))
    //     return newBusiness
    // }
    // return response
}

export const editBusiness = (payload, businessId) => async(dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const editedBusiness = await response.json();
        dispatch(businessEdit(editedBusiness))
        return editedBusiness
    }
    return response;
}

export const deleteBusiness = (businessId) => async(dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`, {
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
            let newState = {...state};
            newState[action.businessId] = action.business;
            return newState
        }
        case GET_ALL_BUSINESS_IMAGES: {
            let newState = {...state}
            newState.allBusinessImages = action.payload
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
            delete newState[action.businessId];
            return newState;
        }
        default:
            return state
    }

}

export default businessReducer;
