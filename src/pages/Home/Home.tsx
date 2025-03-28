import React from "react";
import Modal from "../../layouts/Modal/Modal";

const Home: React.FC = () => {

    const [showModal, setShowModal] = React.useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleConfirmReservation = () => {
        // Lógica para confirmar la reserva
        console.log('Reserva confirmada');
        setShowModal(true);
      };
    return(
        <div>
            HELLO WORLD

            <button onClick={handleConfirmReservation}>Click aqui y ganaras un carro</button>

            {showModal && (
        <Modal
          titleModal="Reserva Recurrente"
          onConfirm={handleConfirmReservation}
          onCancel={handleCloseModal}
        />
      )}
        </div>
    )
}

export default Home;