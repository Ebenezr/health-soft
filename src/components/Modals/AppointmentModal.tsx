import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface ModalProps {
  openModal: boolean;
  closeModal(): void;
}

const AppointmentModal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
  if (!openModal) return null;
  return (
    <motion.div
      className="overlay"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ width: "clamp(30%, 300px, 70%)" }}
      >
        <header className="modal-header">
          <h2>Modal form</h2>
          <button>
            <AiFillCloseSquare
              className="modal-close-icon"
              onClick={closeModal}
            />
          </button>
        </header>
        <article style={{ gridTemplateColumns: "1fr", padding: "2rem" }}>
          <div className="form">
            <span className="input_group">
              <label>Patient</label>
              <input type="text" id="patient" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Doctor</label>
              <input type="text" id="patient" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Appointment Date</label>
              <input type="date" id="patient" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Appointment Time</label>
              <input type="time" id="patient" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Note</label>
              <textarea id="patient" className="inputs"></textarea>
            </span>
          </div>
        </article>
        <footer className="modal-footer">
          <button className="btn save">Action</button>
          <button className="btn close" onClick={closeModal}>
            Close
          </button>
        </footer>
      </motion.section>
    </motion.div>
  );
};

export default AppointmentModal;
