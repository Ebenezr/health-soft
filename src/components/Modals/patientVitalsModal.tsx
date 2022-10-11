import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Label } from "../Radix/Label";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { patientInterface, patientVitals } from "../../interfaces/interfaces";
import Select from "react-select";

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
  vitals: patientVitals;
}

const VitalsModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  vitals,
}) => {
  const [userChoice, setUserChoice] = useState<any>();
  const [formData, setFormData] = useState<patientVitals>({
    id: 0,
    temperature: 0,
    bp_systolic: 0,
    bp_diastolic: 0,
    notes: "",
  });
  const [patients, setPatients] = useState<{ value: number; label: string }[]>(
    []
  );

  useEffect(() => {
    setFormData(vitals);
    try {
      const arr: any = [];
      axios.get("http://127.0.0.1:3000/patients").then((res: any) => {
        let results = res.data;
        results.map((user: patientInterface) => {
          return arr.push({ value: user.id, label: user.fullname });
        });
        setPatients(arr);
      });
    } catch (err) {
      console.error(err);
    }
  }, [vitals]);
  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
  };

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
              <Label htmlFor="patient_id" css={{ lineHeight: "35px" }}>
                Patient
              </Label>
              <Select
                defaultInputValue={vitals?.patient?.fullname}
                className="input-cont"
                placeholder="Select Type"
                options={patients}
                noOptionsMessage={() => "Doctor not found"}
                onChange={(event) => {
                  setUserChoice(event?.value);
                }}
                onBlur={() => setFormData({ ...formData, id: userChoice })}
                value={patients.find((obj) => obj.value === userChoice)}
                classNamePrefix="select"
              />
            </span>
            <span className="input_group">
              <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                Temperature(°C)
              </Label>
              <input
                type="number"
                id="temperature"
                className="inputs"
                value={formData?.temperature}
                onChange={handleChange}
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
                value={formData?.bp_systolic}
                onChange={handleChange}
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
                value={formData?.bp_diastolic}
                onChange={handleChange}
              ></input>
            </span>
            <span className="input_group notes">
              <Label htmlFor="notes" css={{ lineHeight: "35px" }}>
                Nurse Notes
              </Label>
              <textarea
                rows={4}
                id="notes"
                value={formData?.notes}
                onChange={handleChange}
              />
            </span>
          </div>
        </article>
        <footer className="modal-footer">
          <button className="btn save" onClick={handleSubmit}>
            Action
          </button>
          <button className="btn close" onClick={closeModal}>
            Close
          </button>
        </footer>
      </motion.section>
    </motion.div>
  );
};

export default VitalsModal;
