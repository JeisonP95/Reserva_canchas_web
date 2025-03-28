import React, { useState } from 'react';
import CustomButton from '../../components/Buttons/CustomButton';
import './Modal.css';

interface ModalProps {
  titleModal: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
  titleModal,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          {titleModal}
        </div>
        <div className="modal-content">
          <div className="modal-title">
            Reserva fácil y rápido
          </div>
          <div className="modal-description">
            Hemos notado que sueles reservar el [DÍA] a las [HORA] en la cancha [CANCHA].
          </div>
          <div className="modal-question">
            ¿Quieres confirmar tu próxima reserva?
          </div>
          <div className="modal-footer">
            <CustomButton variant='secondary' text='Cancelar' onClick={onCancel}/>            
            <CustomButton variant='primary' text='Aceptar' onClick={onConfirm}/>             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;