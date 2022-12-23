import React, {useState, useEffect} from 'react';
import {
    useLocation,
    useHistory,
    Link
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

// import * as profileActions from '../../store/songs'

const BookmarksList = ({bookmarks}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector((state => state.session.user))
    const [booksList, setBooksList] = useState({})


    const toObjFunc = (arr) => {
        let newObj = {}
        arr.forEach((e) => {
            newObj[String(e)] = String(e)
        })
        return newObj
    }

    useEffect(() => {
        if(bookmarks.business_id.length > 0){
            fetch(`/api/business/bookmarks`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(toObjFunc(bookmarks.business_id))
            }).then(res => res.json()).then(data => setBooksList(data))
        }
    }, [bookmarks])

    return (
        <div className='bookmarks'> {
            Object.values(booksList).map(bus => (
                <div className='busPreview' key={bus.id}>
                    <Link className='busName' to={`/${bus.name}`}></Link>
                </div>
            ))
        }

        </div>
    )
}
export default BookmarksList;
