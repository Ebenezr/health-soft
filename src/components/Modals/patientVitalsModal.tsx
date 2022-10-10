import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Label } from "../Radix/Label";

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

const VitalsModal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
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
        style={{ width: "clamp(40%, 300px, 70%)" }}
      >
        <header className="modal-header">
          <h2>Patient Vitals form</h2>
          <button>
            <AiFillCloseSquare
              className="modal-close-icon"
              onClick={closeModal}
            />
          </button>
        </header>
        <article style={{ gridTemplateColumns: "1fr" }}>
          <div className="form">
            <span className="input_group">
              <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                Temperature(°C)
              </Label>
              <input type="number" id="temperature" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="bp_systolic" css={{ lineHeight: "35px" }}>
                BP Systolic
              </Label>
              <input type="number" id="bp_systolic" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="bp_diastolic" css={{ lineHeight: "35px" }}>
                BP Diasyolic
              </Label>
              <input type="number" id="bp_diastolic" className="inputs"></input>
            </span>
            <span className="input_group notes">
              <Label htmlFor="notes" css={{ lineHeight: "35px" }}>
                Nurse Notes
              </Label>
              <textarea rows={4} id="notes" />
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

export default VitalsModal;
