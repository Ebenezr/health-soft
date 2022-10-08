import Patient from "./components/Tables/AppoinmentTBL";
import Sidenav from "./components/nav/Sidenav";
import "./sass/style.scss";
import DoctorTBL from "./components/Tables/Doctortable";
import NurseTBL from "./components/Tables/NurseTBL";
import TriageTBL from "./components/Tables/TriageTBL";
import VitalsModal from "./components/Modals/patientVitalsModal";
import { motion } from "framer-motion";
import { useState } from "react";
function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <main>
      <Sidenav />
      <TriageTBL />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn main-btn"
        onClick={() => setOpenModal(true)}
      >
        Add new
      </motion.button>
      <VitalsModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </main>
  );
}

export default App;
