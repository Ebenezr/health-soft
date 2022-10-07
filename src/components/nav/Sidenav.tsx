import { NavLink } from "react-router-dom";
import React from "react";
import Icon from "awesome-react-icons";
import {
  FaUserNurse,
  FaUnlock,
  FaStethoscope,
  FaClock,
  FaUserClock,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const Sidenav: React.FC = () => {
  return (
    <Navigation
      // you can use your own router's api to get pathname
      activeItemId="/management/members"
      onSelect={({ itemId }) => {
        // maybe push to the route
      }}
      items={[
        {
          title: "Patient Info",
          itemId: "/patient",
          // you can use your own custom Icon component as well
          // icon is optional
          elemBefore: () => <FaUserClock />,
        },
        {
          title: "Patient Appointment",
          itemId: "/appointments",
          elemBefore: () => <FaClock />,
        },
        {
          title: "Nursing Triage",
          itemId: "/triage",
          elemBefore: () => <FaUserNurse />,
        },
        {
          title: "Check Up",
          itemId: "/checkup",
          elemBefore: () => <FaStethoscope />,
        },
        {
          title: "User Management",
          itemId: "/management",
          elemBefore: () => <FaUnlock />,
          subNav: [
            {
              title: "Doctors",
              itemId: "/management/doctors",
              elemBefore: () => <FaStethoscope />,
            },
            {
              title: "Nurses",
              itemId: "/management/nurses",
              elemBefore: () => <FaUserNurse />,
            },
            {
              title: "Admins",
              itemId: "/management/admins",
              elemBefore: () => <RiAdminFill />,
            },
          ],
        },
      ]}
    />
    // <aside>
    //   <div className="logo">
    //     <h2>Healthsoft</h2>
    //   </div>
    //   <div className="userinfo">
    //     <img src="" alt="" />
    //     <h2>Ebenezar Bukosia</h2>
    //   </div>
    //   <fieldset>
    //     <NavLink className="nav__link" to="/home/patient">
    //       <FaUserClock />
    //       <h3>Patient Info</h3>
    //     </NavLink>

    //     <NavLink className="nav__link" to="/home/appointment">
    //       <FaClock />
    //       <h3>Patient Appointment</h3>
    //     </NavLink>
    //     <NavLink className="nav__link" to="/home/triage">
    //       <FaUserNurse />
    //       <h3>Nursing Triage</h3>
    //     </NavLink>
    //     <NavLink className="nav__link" to="/home/checkup">
    //       <FaStethoscope />
    //       <h3>Check Up</h3>
    //     </NavLink>
    //     <NavLink className="nav__link" to="/home/users">
    //       <FaUnlock />
    //       <h3>User Management</h3>
    //     </NavLink>
    //   </fieldset>
    // </aside>
  );
};

export default Sidenav;
