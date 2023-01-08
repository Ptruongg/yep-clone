const GET_BOOKMARKS = 'bookmarks/getBookmarks'
const GET_USER_BOOKMARKS = 'bookmarks/getUserBookmarks'
const ADD_BOOKMARKS = 'bookmarks/addBookmarks'
const REM_BOOKMARKS = 'bookmarks/remBookmarks'
// const CLEAR_BOOKMARKS = 'bookmarks/clearBookmarks'

const getAllBookmarks = (bookmarks) => {
    return {
        type: GET_BOOKMARKS,
        bookmarks
    }
}
const getUserBookmarks = (userId) => {
    return {
        type: GET_USER_BOOKMARKS,
        userId
    }
}
const addBookmarksAction = (bookmark) => {
    return {
        type: ADD_BOOKMARKS,
        bookmark
    }
}

const remBookmarksAction = (bookmarkId) => {
    return {
        type: REM_BOOKMARKS,
        bookmarkId
    }
}

// const clearBookmarksAction = () => {
//     return {
//         type: CLEAR_BOOKMARKS,
//     }
// }

//thunks
export const getBookmarksThunk = () => async (dispatch) => {
    const response = await fetch(`/api/bookmarks/`)
    if (response.ok) {
        const bookmarks = await response.json()
        // console.log("RES OK2")
        dispatch(getAllBookmarks(bookmarks))
        const allBooks = {};
        bookmarks.bookmarks.forEach((bookmark) => (allBooks[bookmark.id] = bookmark))
        return { ...allBooks }
    }
    return response
}
export const getUserBookmarksThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/bookmarks/user/${userId}`)
    if (response.ok) {
        const bookmarks = await response.json();
        dispatch(getUserBookmarks(bookmarks));
        const all = {};
        bookmarks.bookmarks.forEach((bookmark) => (all[bookmarks.id] = bookmark));
        return { ...all };
    }
    return response;
}
export const addBookmarksThunk = (payload) => async (dispatch) => {
    const response = await fetch("/api/bookmarks/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const error = await response.text()

        return {"error": error}
    }
    const bookmark = await response.json()
    dispatch(addBookmarksAction(bookmark))
    return bookmark

}

export const removeBookmarksThunk = (bookmarkId) => async (dispatch) => {
    const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: "DELETE"
    })
    console.log('reeeeeeeeees', response)
    if (response.ok) {
        dispatch(remBookmarksAction(bookmarkId));
    }

}

// export const clearUserAppr = () => async (dispatch) => {
//     dispatch(clearBookmarksAction())
//     return {message: "User cleared"};
// };


const initialState = {}

const bookmarksReducer = (state = initialState, action) => {
    // let newState = { ...state }
    switch (action.type) {
        case GET_BOOKMARKS: {
            const newState = {};
            action.bookmarks.bookmarks.forEach((book) => (newState[book.id] = book))
            return newState;
        }
        case GET_USER_BOOKMARKS: {
            const newState = {};
            action.userId.bookmarks.forEach((book) => newState[book.id] = book);
            let allBookmarks = { ...newState };
            return allBookmarks;
        }
        case ADD_BOOKMARKS: {
            const newState = { ...state };
            newState[action.bookmark.id] = action.bookmark
            return newState
        }
        case REM_BOOKMARKS: {
            const newState = { ...state }
            delete newState[action.bookmarkId]
            return newState
        }
        // case CLEAR_BOOKMARKS:
        //     return {...initialState}
        default:
            return state
    }
}

export default bookmarksReducer
