import React, {useState, useEffect} from 'react';
import {useLocation, useHistory, Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getBookmarksThunk, getUserBookmarksThunk, removeBookmarksThunk } from '../../store/bookmarks';

import "./bookmarks.css"

// import * as profileActions from '../../store/songs'

const BookmarksList = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    // const location = useLocation()
    // const user = useSelector((state => state.session.user))
    // const [booksList, setBooksList] = useState({})
    const [loaded, setLoaded] = useState(false);
    const bookmarkList = useSelector((state) => Object.values(state.bookmarks))
    const handleClick = (bookmark) => {
        history.push(`/bookmarks/${bookmark.id}`)
    }

    useEffect(() => {
        dispatch(getBookmarksThunk()).then(() => setLoaded(true))
    }, [dispatch])

    return (
        <div>
            <h2>My Bookmarks</h2>
            {loaded &&
                bookmarkList.map((book) => (
                    <div
                        className='myBookmarks'
                        key={book.id}
                        onClick={() => handleClick(book)}
                    >
                        <div>
                            <div className='bookDetails'>
                                <div>{book.name} </div>
                                {/* <img>
                                    src={business.img}
                                </img> */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
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

}
export default BookmarksList;
