import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditReview from './editReview'



function EditReviewModal({ reviewId, businessId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='edit-review-button' onClick={() => setShowModal(true)}>Edit</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditReview reviewId={reviewId} businessId={businessId} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default EditReviewModal
