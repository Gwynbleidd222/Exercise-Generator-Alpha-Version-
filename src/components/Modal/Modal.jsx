import React from 'react'
import '../Modal/modal.css'

function Modal({children, onClose}) {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
          <div className='modal-body'>
            {children}
          </div>
        
      </div>
    </div>
  )
}

export default Modal
