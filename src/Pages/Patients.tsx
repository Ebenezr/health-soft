import React, { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import VitalsModal from "../components/Modals/patientVitalsModal";
import PatientTBL from "../components/Tables/PatientTBL";
import { motion } from "framer-motion";

const Patients: React.FC<{ className?: string }> = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="panel__main">
      <h1 className="section__title">PatientInfo List</h1>
      <div className="section__header">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenModal(true)}
          className="add_button"
        >
          <FaPlusSquare className="add_button_icon" />
        </motion.button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <PatientTBL />
      </div>
      <VitalsModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Patients;
