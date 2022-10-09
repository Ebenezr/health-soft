import React, { useState } from "react";
import DoctorModal from "../components/Modals/DoctorModal";
import DoctorTBL from "../components/Tables/Doctortable";
import { motion } from "framer-motion";
import { FaPlusSquare } from "react-icons/fa";

const Doctor = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="panel__main">
      <h1 className="section__title">Doctors List</h1>
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
        <DoctorTBL />
      </div>
      <DoctorModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Doctor;
