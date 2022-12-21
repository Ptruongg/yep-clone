// import React, {useState, useEffect} from 'react';
// import {
//     useLocation,
//     useHistory,
//     Link
// } from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux'

// // import * as profileActions from '../../store/songs'

// function BookmarksList({bookmarks}) {
//     const dispatch = useDispatch()
//     const location = useLocation()
//     const history = useHistory()
//     const [booksList, setBooksList] = useState({})
//     const sessionUser = useSelector((state) => state.session);

//     const toObjFunc = (arr) => {
//         let newObj = {}
//         arr.forEach((e) => {
//             newObj[String(e)] = String(e)
//         })
//         return newObj
//     }

//     useEffect(() => {
//         if(bookmarks.business_id.length > 0){
//             fetch(`/api/business/bookmarks`, {
//                 method: "POST",
//                 headers: {"Content-Type":"application/json"},
//                 body: JSON.stringify(toObjFunc(bookmarks.business_id))
//             }).then(res => res.json()).then(data => setBooksList(data))
//         }
//     }, [bookmarks])

//     return (
//         <div className='userBooksGrid'> {
//             Object.values(booksList).map(project => (
//                 <div className='apprPreview' key={business.id}>
//                     <Link className='apprPreviewImgCont' to={{ pathname: `/business/${business.id}`, state: { background: location } }}><img className='businessPrevImg' src={business.imageUrl} /></Link>
//                     {/* <Link className='apprUserText' to={`/${business.user_id.name}`}>
//                     {project.User.first_name} {project.User.last_name}
//                     </Link>
//                     <Link className='apprProjectText' to={`/gallery/${project.id}`}>
//                     {project.name}
//                     </Link>
//                     <div className='apprAppr'>
//                     <i className="apprIcon fa-solid fa-thumbs-up" />
//                     <div className='apprAppr_text'>{project.appreciations}</div>
//                     </div> */}
//                 </div>
//             ))
//         }
//         </div>
//     )
// }
// export default BookmarksList;
