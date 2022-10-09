import React, { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import DoctorModal from "../components/Modals/DoctorModal";
import NurseTBL from "../components/Tables/NurseTBL";
import { motion } from "framer-motion";

const Nurse = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="panel__main">
      <h1 className="section__title">Nurses List</h1>
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
        <NurseTBL />
      </div>
      <DoctorModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Nurse;
