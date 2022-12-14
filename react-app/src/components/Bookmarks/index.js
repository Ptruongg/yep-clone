import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getBookmarksThunk, getUserBookmarksThunk, removeBookmarksThunk } from '../../store/bookmarks';
import "./bookmarks.css"
import RemoveBookmarkModal from '../RemoveBookmark';

// import * as profileActions from '../../store/songs'

const BookmarksList = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userId } = useParams()
    // const location = useLocation()
    const sessionUser = useSelector((state => state.session.user))
    // const [booksList, setBooksList] = useState({})
    // const [loaded, setLoaded] = useState(false);
    const bookmarks = useSelector((state) => state.bookmarksReducer)
    const bookmarkList = useSelector((state) => Object.values(state?.bookmarksReducer))
    // console.log(bookmarkList, 'boooooks')
    // const handleClick = (bookmark) => {
    //     history.push(`/bookmarks/${bookmark.id}`)
    // }
    // const removeBookmark = (bookmarkList) => {
    //     // e.preventDefault();
    //     dispatch(removeBookmarksThunk(bookmarkList.id));
    //     // history.push(`/bookmarks/user/${sessionUser.id}`)
    // }
    useEffect(() => {
        dispatch(getUserBookmarksThunk(userId))
    }, [dispatch])

    return (
        <div className="homepage">
            <div className='businessTitle'>{bookmarkList?.length > 0 ? "My Bookmarks" : "You currently do not have any bookmarks"}</div>

            <div className="bookmarks-list">
                {bookmarkList &&
                    bookmarkList.map((bus) => (
                        <>
                            <div>
                                {/* <div>{bus.business.name}</div> */}
                                {/* <div>id {bus.id}</div> */}
                                <RemoveBookmarkModal bookmarkId={bus.id} />

                                {/* <div>
                                    <button className="deletebookmark" onClick={() => removeBookmark(bus.id)}>Remove Bookmark</button>
                                </div> */}
                            </div>
                            <NavLink to={`/business/${bus.business.id}`}>
                                <div className="busCard" key={bus.business.id}>

                                    <div className="businessDiv">
                                        <div className="businessImage" style={{ fontFamily: "Times-new-roman" }}>
                                            <img src={bus.business.imageUrl} className="bizphoto" onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src =
                                                    "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                            }}></img>
                                        </div>
                                        <div className="business-text">
                                            <div className="name">
                                                {bus.business.name}
                                            </div>
                                            <div className="address">
                                                {bus.business.address}, {bus.business.city}, {bus.business.state}, {bus.business.zipcode}, {bus.business.country}
                                                <img src={'https://icons.veryicon.com/png/o/miscellaneous/basic-linear-icon/address-101.png'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                                            </div>
                                            <div className="phone-number">
                                                {bus.business.phoneNumber}
                                                <img src={'https://static.vecteezy.com/system/resources/previews/003/720/498/original/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg'} style={{ width: "1.3em", marginLeft: "1.1em" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </>
                    ))}
            </div>
        </div>
        // <div>
        // <h2>My Bookmarks</h2>
        /* {bookmarkList &&
            bookmarkList.map((book) => (
                <div>

                </div>
                // <div
                //     className='myBookmarks'
                //     key={book.id}
                //     onClick={() => handleClick(book)}
                // >
                //     <div>
                //         <div className='bookDetails'>
                //             <div>{book.business.name} </div>
                //             {/* <img>
                //                 src={business.img}
                //             </img> */
        //         </div>
        //     </div>
        // </div>
        // ))
        // } */}
        // </div>
    )
}
// )
// useEffect(() => {
//     if (bookmark.business_id.length > 0) {
//         fetch(`/api/businesses/${id}/bookmarks/${id2}`, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(toObjFunc(bookmarks.business_id))
//         }).then(res => res.json()).then(data => setBooksList(data))
//     }
// }, [bookmark])

// if (prof) {
//     busList = prof.businessId.map((business) => {
//         return (
//             <div>

//             </div>
//         )
//     })
// }


// return (
//     <div className='bookmarks'> {
//         Object.values(booksList).map(bus => (
//             <div className='busPreview' key={bus.id}>
//                 <Link className='busName' to={`/${bus.name}`}></Link>
//             </div>
//         ))
//     }

//     </div>
//     <div>
//         {bookmark.length ?
//          bookmark.map(bookmark, idx) => (
//             <div key={idx}/>
//                 <NavLink to={`/business/${businessId}`} />

//          )
//     </div>
// )


export default BookmarksList;
