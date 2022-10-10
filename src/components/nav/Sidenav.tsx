import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Avatar, AvatarFallback, AvatarImage } from "../Radix/avata";
import { Separator } from "../Radix/separators";

const Sidenav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside>
      <div className="logo">
        <Avatar>
          <AvatarImage src="" alt="Pedro Duarte" />
          <AvatarFallback>HS</AvatarFallback>
        </Avatar>
        <h2>Healthsoft</h2>
      </div>
      <Separator css={{ margin: "15px 0" }} />

      <div className="userinfo">
        <Avatar>
          <AvatarImage src="" alt="Pedro Duarte" />
          <AvatarFallback>NK</AvatarFallback>
        </Avatar>
        <h2>Njeri Kadhoni</h2>
      </div>
      <Separator css={{ margin: "15px 0" }} />
      <Navigation
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          //navigate to selected path
          navigate(itemId);
        }}
        items={[
          {
            title: "Patient Info",
            itemId: "/patients",

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
