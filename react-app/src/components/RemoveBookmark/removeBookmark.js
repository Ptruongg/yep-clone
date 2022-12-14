
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBusinessDetails } from "../../store/businesses";
import { getUserBookmarksThunk, removeBookmarksThunk } from "../../store/bookmarks";


function RemoveBookmark({ bookmarkId, onClick }) {
    let dispatch = useDispatch();
    let history = useHistory();


    const removeBookmarkId = () => {
        // e.preventDefault();
        dispatch(removeBookmarksThunk(bookmarkId));
        onClick();
        // history.push(`/bookmarks/user/${sessionUser.id}`)
    }

    return (
        <div className="delete-post" style={{height: "150px", width: "400px"}}>
            <div className="delete-head">
                <h3 className="delete-top-modal">Delete post?</h3>
                <div className="confirmation-delete-msg" style={{color: "black", marginBottom: "10px"}}>
                    Are you sure you want to remove this bookmark?
                </div>
            </div>
            <div className="remove-book">
                {/* <div className="delete-option cancel" onClick={onClick}>
                    Cancel
                </div> */}
                <div className="delete-bookmark-button">
                    <button style={{ borderRadius: "5em", color: "white", backgroundColor: "red" }} className='deleteComment' onClick={removeBookmarkId}>Remove Bookmark</button>
                </div>

            </div>
        </div>
    );
}

export default RemoveBookmark;
