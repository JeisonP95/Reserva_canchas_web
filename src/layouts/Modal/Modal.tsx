import React from "react"
import CustomButton from "../../components/Buttons/CustomButton"
import "./Modal.css"

interface ModalProps {
  titleModal: string
  children: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({ titleModal, children, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay-component">
      <div className="modal-container-component">
        <div className="modal-header-component">
          <h3 className="modal-title">{titleModal}</h3>
          <button className="modal-close-button" onClick={onCancel}>
            ×
          </button>
        </div>
        <div className="modal-content-component">
          {children}
          <div className="modal-footer-component">
            <CustomButton variant="secondary" text="Cancelar" onClick={onCancel} />
            <CustomButton variant="primary" text="Aceptar" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
