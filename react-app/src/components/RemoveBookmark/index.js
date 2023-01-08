import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import RemoveBookmark from './removeBookmark'
import "./removeBookmark.css"


function RemoveBookmarkModal({ bookmarkId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='remove-bookmark-button' onClick={() => setShowModal(true)}>Remove Bookmark</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <RemoveBookmark bookmarkId={bookmarkId} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default RemoveBookmarkModal
