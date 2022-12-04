import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditBusiness from './editBusiness'
import './editBusiness.css'

function EditBusinessModal({ business }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='edit-bus-button' onClick={() => setShowModal(true)}>Edit</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBusiness business={business} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditBusinessModal
