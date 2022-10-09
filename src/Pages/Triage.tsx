import React, { useState } from "react";
import VitalsModal from "../components/Modals/patientVitalsModal";
import { FaPlusSquare } from "react-icons/fa";

import TriageTBL from "../components/Tables/TriageTBL";
import { motion } from "framer-motion";

const Triage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="panel__main">
      <h1 className="section__title">Patient Vitals Summary</h1>
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
        <TriageTBL />
      </div>
      <VitalsModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Triage;
