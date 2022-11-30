import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteReview from './DeleteReview'



function DeleteReviewModal({ review }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='delete-business-button' onClick={() => setShowModal(true)}>Delete</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteReview review={review} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default DeleteReviewModal
