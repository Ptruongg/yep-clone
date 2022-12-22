const GET_BOOKMARKS = 'bookmarks/getBookmarks'
const ADD_BOOKMARKS = 'bookmarks/addBookmarks'
const REM_BOOKMARKS = 'bookmarks/remBookmarks'
const CLEAR_BOOKMARKS = 'bookmarks/clearBookmarks'

const getBookmarksAction = (data) => {
    return {
        type: GET_BOOKMARKS,
        data
    }
}

const addBookmarksAction = (data) => {
    return {
        type: ADD_BOOKMARKS,
        data
    }
}

const remBookmarksAction = (data) => {
    return {
        type: REM_BOOKMARKS,
        data
    }
}

const clearBookmarksAction = () => {
    return {
        type: CLEAR_BOOKMARKS,
    }
}

//thunks
export const getBookmarksThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/business/${businessId}`)
    // console.log(response)
    if (response.ok) {
        const data = await response.json()
        // console.log("RES OK2")
        dispatch(getBookmarksAction(data))
        return data.bookmarks
    }
    return response
}

export const addBookmarksThunk = (businessId, userId) => async (dispatch) => {
    const response = await fetch(`/api/business/${userId}/bookmarks/${businessId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    })
    if (response.ok) {
        const data = await response.json()
        // console.log("DATA IN ADDAPPRECITE THUNK", data)
        dispatch(addBookmarksAction(data))
        return data
    }
    return response
}

export const removeAppreciations = (businessId, userId) => async (dispatch) => {
    const response = await fetch(`/api/business/${userId}/bookmarks/${businessId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        // console.log("DATA IN REMOVE APP THUNj", data)
        dispatch(remBookmarksAction(data))
        return data
    }
    return response
}

export const clearUserAppr = () => async (dispatch) => {
    dispatch(clearBookmarksAction())
    return {message: "User cleared"};
};

const initialState = { "current_bookmarks": [] }

const bookmarksReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_BOOKMARKS:
            return { ...state, ...action.data }
        case ADD_BOOKMARKS:
            return { ...state, current_bookmarks: [...state.current_bookmarks, action.data] }
        case REM_BOOKMARKS:
            return { ...state, current_bookmarks: state.current_bookmarks.filter((e) => e !== action.data) }
        case CLEAR_BOOKMARKS:
            return {...initialState}
        default:
            return state
    }
}

export default bookmarksReducer
