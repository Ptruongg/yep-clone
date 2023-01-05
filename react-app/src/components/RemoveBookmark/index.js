import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import RemoveBookmark from './removeBookmark'



function RemoveBookmarkModal({ bookmarkId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='remove-bookmark-button' onClick={() => setShowModal(true)}>Remove Bookmark</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <RemoveBookmark bookmarkId={bookmarkId} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default RemoveBookmarkModal
