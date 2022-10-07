import { NavLink } from "react-router-dom";
import {
  FaUserNurse,
  FaUnlock,
  FaStethoscope,
  FaClock,
  FaUserClock,
} from "react-icons/fa";
const Sidenav = () => {
  <aside>
    <div className="logo">
      <h2>Healthsoft</h2>
    </div>
    <div className="userinfo">
      <img src="" alt="" />
      <h2>Ebenezar Bukosia</h2>
    </div>
    <fieldset>
      <NavLink className="nav__link" to="/home/patient">
        <FaUserClock />
        <h3>Patient Info</h3>
      </NavLink>

      <NavLink className="nav__link" to="/home/appointment">
        <FaClock />
        <h3>Patient Appointment</h3>
      </NavLink>
      <NavLink className="nav__link" to="/home/triage">
        <FaUserNurse />
        <h3>Nursing Triage</h3>
      </NavLink>
      <NavLink className="nav__link" to="/home/checkup">
        <FaStethoscope />
        <h3>Check Up</h3>
      </NavLink>
      <NavLink className="nav__link" to="/home/users">
        <FaUnlock />
        <h3>User Management</h3>
      </NavLink>
    </fieldset>
  </aside>;
};

export default Sidenav;
