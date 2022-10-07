import React from "react";
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
    <aside>
      <div className="logo">
        <h2>Healthsoft</h2>
      </div>

      <div className="userinfo">
        <img src="" alt="" />
        <h2>Ebenezar Bukosia</h2>
      </div>
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
    </aside>
  );
};

export default Sidenav;
