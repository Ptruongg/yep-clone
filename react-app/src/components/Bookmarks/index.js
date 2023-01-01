import React, {useState, useEffect} from 'react';
import {useLocation, useHistory, Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getBookmarksThunk, removeBookmarksThunk } from '../../store/bookmarks';
import "./bookmarks.css"

// import * as profileActions from '../../store/songs'

const BookmarksList = ({bookmarks}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector((state => state.session.user))
    const [booksList, setBooksList] = useState({})
    const bookmark = useSelector((state) => Object.values(state.bookmark))
    const [prof, setProf] = useState({user: null})


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
