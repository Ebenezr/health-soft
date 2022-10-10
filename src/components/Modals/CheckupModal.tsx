import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Avatars/Tabs";

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

const CheckupModal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
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
          <div className="left form">
            <span className="input_group">
              <label>Patient</label>
              <input type="text" id="patient" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Patient Type</label>
              <input type="text" id="last_name" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Doctor</label>
              <input type="number" id="national_id" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Checkup Date</label>
              <input type="text" id="gender" className="inputs"></input>
            </span>
            <span className="input_group">
              <label>Next Visit</label>
              <input type="date" id="dob" className="inputs"></input>
            </span>
            <span className="input_group notes">
              <label>Advice</label>
              <textarea rows={4} id="notes" />
            </span>
            <span className="input_group notes">
              <label>Comments</label>
              <textarea rows={4} id="notes" />
            </span>
          </div>
          <div className="right form">
            <Tabs defaultValue="tab1">
              <TabsList aria-label="Manage your account">
                <TabsTrigger value="tab1">Chief Compaint</TabsTrigger>
                <TabsTrigger value="tab2">Vital Signs </TabsTrigger>
                <TabsTrigger value="tab3">Treatment</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <div className="form">
                  <span className="input_group notes">
                    <label>Symptomps</label>
                    <textarea rows={3} id="notes" />
                  </span>
                  <span className="input_group notes">
                    <label>Diagnosis</label>
                    <textarea rows={3} id="notes" />
                  </span>
                  <span className="input_group notes">
                    <label>HPI</label>
                    <textarea rows={3} id="notes" />
                  </span>
                  <span className="input_group notes">
                    <label>Physical Examinations</label>
                    <textarea rows={3} id="notes" />
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="form">
                  <span className="input_group">
                    <label>Temperature(°C)</label>
                    <input
                      type="number"
                      id="temperature"
                      className="inputs"
                    ></input>
                  </span>
                  <span className="input_group">
                    <label>BP Systolic</label>
                    <input
                      type="number"
                      id="bp_systolic"
                      className="inputs"
                    ></input>
                  </span>
                  <span className="input_group">
                    <label>BP Diasyolic</label>
                    <input
                      type="number"
                      id="bp_diastolic"
                      className="inputs"
                    ></input>
                  </span>
                  <span className="input_group notes">
                    <label>Nurse Notes</label>
                    <textarea rows={4} id="notes" />
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="tab3"></TabsContent>
            </Tabs>
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

export default CheckupModal;
