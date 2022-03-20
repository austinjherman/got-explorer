import React from 'react'

import './Modal.css'

type Props = {
  close: () => void
  jsx: () => React.ReactElement
}

function Modal({ close, jsx }: Props) {
  return (
    <>
      <div className="modal-screen" />
      <div className="modal">
        <div className="close">
          <button onClick={() => close()}>Close</button>
        </div>
        <div className="data">
          { jsx() }
        </div>
      </div>
    </>
  )
}

export default Modal
