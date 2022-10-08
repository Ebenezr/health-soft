import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Appointments from "./Appointments";
import Checkups from "./Checkup";
import Dashboard from "./DashBoard";
import Doctor from "./Doctor";
import Footer from "./Footer";
import Header from "./Header";
import Nurse from "./Nurse";
import Patients from "./Patients";
import Triage from "./Triage";
import Users from "./Users";

const Main: React.FC = () => {
  return (
    <section className="container__main">
      <Header />
      <div className="view__main">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path="patients" element={<Patients />} />
        </Routes>
        <Routes>
          <Route path="triage" element={<Triage />} />
        </Routes>
        <Routes>
          <Route path="appointments" element={<Appointments />} />
        </Routes>
        <Routes>
          <Route path="checkups" element={<Checkups />} />
        </Routes>
        <Routes>
          <Route path="management" element={<Users />}>
            <Route path="doctors" element={<Doctor />} />
            <Route path="nurses" element={<Nurse />} />
            <Route path="admins" element={<Admin />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </section>
  );
};

export default Main;
