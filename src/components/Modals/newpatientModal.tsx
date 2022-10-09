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

const NewPatientModal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
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
        <article>
          <span className="input_group">
            <label>Temperature(C)</label>
            <input type="number" id="temperature"></input>
          </span>{" "}
          <span className="input_group">
            <label>BP Systolic</label>
            <input type="number" id="bp_systolic"></input>
          </span>
          <span className="input_group">
            <label>BP Diasyolic</label>
            <input type="number" id="bp_diastolic"></input>
          </span>
          <span className="input_group">
            <label>Nurse Notes</label>
            <input type="text-area" id="notes"></input>
          </span>
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

export default NewPatientModal;
