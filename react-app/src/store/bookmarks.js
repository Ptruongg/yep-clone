const GET_BOOKMARKS = 'bookmarks/getBookmarks'
const GET_USER_BOOKMARKS = 'bookmarks/getUserBookmarks'
const ADD_BOOKMARKS = 'bookmarks/addBookmarks'
const REM_BOOKMARKS = 'bookmarks/remBookmarks'
// const CLEAR_BOOKMARKS = 'bookmarks/clearBookmarks'

const getBookmarksAction = (data) => {
    return {
        type: GET_BOOKMARKS,
        data
    }
}
const getUserBookmarks = (userBookmarks) => {
    return {
        type: GET_USER_BOOKMARKS,
        userBookmarks
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

// const clearBookmarksAction = () => {
//     return {
//         type: CLEAR_BOOKMARKS,
//     }
// }

//thunks
export const getBookmarksThunk = () => async (dispatch) => {
    const response = await fetch(`/api/bookmarks`)
    // console.log(response)
    if (response.ok) {
        const bookmarks = await response.json()
        // console.log("RES OK2")
        dispatch(getBookmarksAction(bookmarks))
        const allBooks = {};
        bookmarks.forEach((bookmark) => (allBooks[bookmark] = bookmark))
        return { ...allBooks }
    }
    return response
}
export const getUserBookmarksThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/bookmarks/user/${userId}`)
    if (response.ok) {
        const userBooks = await response.json();
        dispatch(getUserBookmarks(userBooks));
        return userBooks;
    }
    return response;
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
        dispatch(addBookmarksAction(data))
        return data
    }
    return response
}

export const removeBookmarksThunk = (businessId, userId) => async (dispatch) => {
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

// export const clearUserAppr = () => async (dispatch) => {
//     dispatch(clearBookmarksAction())
//     return {message: "User cleared"};
// };


const initialState = {}

const bookmarksReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_BOOKMARKS:
            const allBooks = {};
            action.bookmark.forEach((book) => (allBooks[book.id] = book))
            return allBooks;
        case GET_USER_BOOKMARKS: {
            const newState = {};
            action.userBookmarks.forEach(bookmark => newState[bookmark.id] = bookmark)
            let allBookmarks = {...newState}
            return allBookmarks;
        }
        case ADD_BOOKMARKS:
            return { ...state, current_bookmarks: [...state.current_bookmarks, action.data] }
        case REM_BOOKMARKS:
            return { ...state, current_bookmarks: state.current_bookmarks.filter((e) => e !== action.data) }
        // case CLEAR_BOOKMARKS:
        //     return {...initialState}
        default:
            return state
    }
}

export default bookmarksReducer
