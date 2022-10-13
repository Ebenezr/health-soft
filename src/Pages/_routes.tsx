import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Appointments from "./Appointments";
import Checkups from "./Checkup";
import Dashboard from "./DashBoard";
import Doctor from "./Doctor";
import Nurse from "./Nurse";
import Patients from "./Patients";
import Triage from "./Triage";
import Users from "./Users";
const Routing = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />

    <Route path="patients" element={<Patients />} />

    <Route path="triage" element={<Triage />} />

    <Route path="appointments" element={<Appointments />} />

    <Route path="checkup" element={<Checkups />} />

    <Route path="management" element={<Doctor />} />

    <Route path="management/doctors" element={<Doctor />} />

    <Route path="management/nurses" element={<Nurse />} />

    <Route path="management/admins" element={<Admin />} />
  </Routes>
);

export default Routing;
