import React, { Children, useState } from 'react';
import CustomButton from '../../components/Buttons/CustomButton';
import './Modal.css';

interface ModalProps {
  titleModal: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
  titleModal,
  children,
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
         {children}
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