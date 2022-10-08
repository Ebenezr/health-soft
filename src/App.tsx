import Sidenav from "./components/nav/Sidenav";
import "./sass/style.scss";

import { useState } from "react";
import Layout from "./Pages/Layout";

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <main>
      <Sidenav />
      <Layout />
    </main>
  );
}

export default App;

// <Sidenav />
//   <TriageTBL />
//   <motion.button
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//     className="btn main-btn"
//     onClick={() => setOpenModal(true)}
//   >
//     Add new
//   </motion.button>
//   <VitalsModal
//     openModal={openModal}
//     closeModal={() => setOpenModal(false)}
//   />
