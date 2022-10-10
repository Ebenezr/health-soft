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

const PatientModal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
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
        style={{ width: "clamp(60%, 700px, 70%)" }}
      >
        <header className="modal-header">
          <h2>Patient Info Form</h2>
          <button>
            <AiFillCloseSquare
              className="modal-close-icon"
              onClick={closeModal}
            />
          </button>
        </header>
        <article>
          <div className="left form">
            <span className="input_group">
              <Label htmlFor="first_name" css={{ lineHeight: "35px" }}>
                First Name
              </Label>
              <input type="text" id="first_name" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="last_name" css={{ lineHeight: "35px" }}>
                Last Name
              </Label>
              <input type="text" id="last_name" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="national_id" css={{ lineHeight: "35px" }}>
                National ID
              </Label>

              <input type="number" id="national_id" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="gender" css={{ lineHeight: "35px" }}>
                Gender
              </Label>
              <input type="text" id="gender" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="dob" css={{ lineHeight: "35px" }}>
                DOB
              </Label>
              <input type="date" id="dob" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="marital_status" css={{ lineHeight: "35px" }}>
                Marital Status
              </Label>

              <input type="text" id="marital_status" className="inputs"></input>
            </span>
          </div>
          <div className="right form">
            <span className="input_group">
              <Label htmlFor="phone" css={{ lineHeight: "35px" }}>
                Phone Number
              </Label>
              <input type="number" id="phone" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="email" css={{ lineHeight: "35px" }}>
                Email
              </Label>
              <input type="eamil" id="email" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="address" css={{ lineHeight: "35px" }}>
                Address
              </Label>
              <input type="text" id="address" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="county" css={{ lineHeight: "35px" }}>
                County
              </Label>
              <input type="text" id="county" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="estate" css={{ lineHeight: "35px" }}>
                Estate
              </Label>
              <input type="text" id="estate" className="inputs"></input>
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

export default PatientModal;
