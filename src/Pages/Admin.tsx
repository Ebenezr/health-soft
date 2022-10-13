import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlusSquare } from "react-icons/fa";
import { userInterface } from "../interfaces/interfaces";
import AdminModal from "../components/Modals/AdminModal";
import AdminTBL from "../components/Tables/AdminTBL";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<userInterface>({});
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
        <AdminTBL />
      </div>
      <AdminModal
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Admin;
