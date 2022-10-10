import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Radix/Tabs";
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
        style={{ height: "70vh" }}
      >
        <header className="modal-header">
          <h2>Doctors CheckUp</h2>
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
              <Label htmlFor="patient" css={{ lineHeight: "35px" }}>
                Patient
              </Label>
              <input type="text" id="patient" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="patient" css={{ lineHeight: "35px" }}>
                Patient Type
              </Label>
              <input type="text" id="patient_type" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="doctor" css={{ lineHeight: "35px" }}>
                Doctor
              </Label>
              <input type="text" id="doctor" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="checkup_date" css={{ lineHeight: "35px" }}>
                Checkup Date
              </Label>
              <input type="date" id="checkup_date" className="inputs"></input>
            </span>
            <span className="input_group">
              <Label htmlFor="checkup_date" css={{ lineHeight: "35px" }}>
                Next Visit
              </Label>
              <input type="date" id="next_visit" className="inputs"></input>
            </span>
            <span className="input_group notes">
              <Label htmlFor="advice" css={{ lineHeight: "30px" }}>
                Advice
              </Label>
              <textarea rows={3} id="notes" />
            </span>
            <span className="input_group notes">
              <Label htmlFor="comments" css={{ lineHeight: "30px" }}>
                Comments
              </Label>
              <textarea rows={3} id="notes" />
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
                    <Label htmlFor="symptoms" css={{ lineHeight: "30px" }}>
                      Symptoms
                    </Label>
                    <textarea rows={3} id="symptoms" />
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="diagnosis" css={{ lineHeight: "30px" }}>
                      Diagnosis
                    </Label>
                    <textarea rows={2} id="diagnosis" />
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="hpi" css={{ lineHeight: "30px" }}>
                      HPI
                    </Label>
                    <textarea rows={3} id="hpi" />
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="examination" css={{ lineHeight: "30px" }}>
                      Physical Examinations
                    </Label>
                    <textarea rows={3} id="examination" />
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="form">
                  <span className="input_group">
                    <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                      Temperature(°C)
                    </Label>

                    <input
                      type="number"
                      id="temperature"
                      className="inputs"
                    ></input>
                  </span>
                  <span className="input_group">
                    <Label htmlFor="bp_systolic" css={{ lineHeight: "35px" }}>
                      BP Systolic
                    </Label>
                    <input
                      type="number"
                      id="bp_systolic"
                      className="inputs"
                    ></input>
                  </span>
                  <span className="input_group">
                    <Label htmlFor="bp_diastolic" css={{ lineHeight: "35px" }}>
                      BP Diasyolic
                    </Label>

                    <input
                      type="number"
                      id="bp_diastolic"
                      className="inputs"
                    ></input>
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                      Nurse Notes
                    </Label>
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
