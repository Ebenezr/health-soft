import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { padding } from "@mui/system";

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

const DoctorModal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
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
          <div className="left form">
            <span className="input_group">
              <label>First Name</label>
              <input type="text" id="first_name" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Last Name</label>
              <input type="text" id="last_name" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Phone Number</label>
              <input type="number" id="phone" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Email</label>
              <input type="text" id="eamil" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Designation</label>
              <input type="text" id="designation" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Password</label>
              <input type="password" id="password" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Confirm Password</label>
              <input type="password" id="cpassword" className="inputs"></input>
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

export default DoctorModal;
