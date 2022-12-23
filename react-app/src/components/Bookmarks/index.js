import React, {useState, useEffect} from 'react';
import {useLocation, useHistory, Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getBookmarksThunk, removeBookmarksThunk } from '../../store/bookmarks';

// import * as profileActions from '../../store/songs'

const BookmarksList = ({bookmarks}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector((state => state.session.user))
    const [booksList, setBooksList] = useState({})
    const bookmark = useSelector((state) => Object.values(state.bookmark))

    useEffect(() => {
        dispatch(getBookmarksThunk(businessId))
    }, [dispatch, businessId])
    // const toObjFunc = (arr) => {
    //     let newObj = {}
    //     arr.forEach((e) => {
    //         newObj[String(e)] = String(e)
    //     })
    //     return newObj
    // }

    // useEffect(() => {
    //     if(bookmarks.business_id.length > 0){
    //         fetch(`/api/business/bookmarks`, {
    //             method: "POST",
    //             headers: {"Content-Type":"application/json"},
    //             body: JSON.stringify(toObjFunc(bookmarks.business_id))
    //         }).then(res => res.json()).then(data => setBooksList(data))
    //     }
    // }, [bookmarks])

    // return (
    //     // <div className='bookmarks'> {
    //     //     Object.values(booksList).map(bus => (
    //     //         <div className='busPreview' key={bus.id}>
    //     //             <Link className='busName' to={`/${bus.name}`}></Link>
    //     //         </div>
    //     //     ))
    //     // }

    //     // </div>
    //     // <div>
    //     //     {bookmark.length ?
    //     //      bookmark.map(bookmark, idx) => (
    //     //         <div key={idx}/>
    //     //             <NavLink to={`/business/${businessId}`} />

    //     //      )
    //     // </div>
    // )
}
export default BookmarksList;
