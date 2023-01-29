const GET_SEARCH_RESULTS = 'search/GE_SEARCH_RESULTS'

const getSearchResults = (businesses) => {
    return {
        type: GET_SEARCH_RESULTS,
        businesses
    }
}

//thunk

export const getAllSearchResults = (name, city, state) => async (dispatch) => {
    const response = await fetch(`/api/search/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, city, state})
    })
    if (response.ok) {
        const searchResults = await response.json();
        dispatch(getSearchResults(searchResults));
        return ["Results", searchResults];
    }
}

//reducer
const initialState = {};

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_RESULTS: {
            const newState = {...state};
            for (let business of action.businesses.businesses) {
                newState[business.id] = business
            }
            return newState
        }
    }
}
export default searchReducer;
