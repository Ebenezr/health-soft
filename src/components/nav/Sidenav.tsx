import React, { useEffect, useState } from "react";
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
import logo from "../../assets/ebbe.png";
import { userInterface } from "../../interfaces/interfaces";

const Sidenav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [acc, setAcc] = useState<userInterface>({});
  const [role, setRole] = useState<string>("NURSE");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const userRole = JSON.parse(localStorage.getItem("role"));
    setAcc(loggedUser);
    setRole(userRole);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside>
      <div className="logo">
        <Avatar>
          <AvatarImage src={logo} alt="Pedro Duarte" />
          <AvatarFallback>HS</AvatarFallback>
        </Avatar>
        <h2>Healthsoft</h2>
      </div>
      <Separator css={{ margin: "15px 0" }} />

      <div className="userinfo">
        <Avatar>
          <AvatarImage src="" alt="Pedro Duarte" />
          <AvatarFallback>
            {acc?.firstName?.slice(0, 1)}
            {acc?.lastName?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="text-info">
          <h2>
            {acc?.firstName} {acc?.lastName}
          </h2>
          <small>{role}</small>
        </div>
      </div>
      <Separator css={{ margin: "15px 0" }} />

      <Navigation
        activeItemId={location.pathname}
        items={[
          {
            title: "Patient Info",
            itemId: "/home/patients",

            elemBefore: () => <FaUserClock color="#7380ec" size="1.4rem" />,
          },
          {
            title: "Patient Appointment",
            itemId: "/home/appointments",
            elemBefore: () => <FaClock color="#7380ec" size="1.4rem" />,
          },
          {
            title: "Nursing Triage",
            itemId: "/home/triage",
            elemBefore: () => <FaUserNurse color="#7380ec" size="1.4rem" />,
          },
          {
            title: "Check Up",
            itemId: "/home/checkup",
            elemBefore: () => <FaStethoscope color="#7380ec" size="1.4rem" />,
          },
          {
            title: "User Management",
            itemId: "/home/management",
            elemBefore: () => <FaUnlock color="#7380ec" size="1.4rem" />,
            subNav: [
              {
                title: "Doctors",
                itemId: "/home/management/doctors",
                elemBefore: () => (
                  <FaStethoscope color="#7380ec" size="1.3rem" />
                ),
              },
              {
                title: "Nurses",
                itemId: "/home/management/nurses",
                elemBefore: () => <FaUserNurse color="#7380ec" size="1.3rem" />,
              },
              {
                title: "Admins",
                itemId: "/home/management/admins",
                elemBefore: () => <RiAdminFill color="#7380ec" size="1.3rem" />,
              },
            ],
          },
        ]}
      />
    </aside>
  );
};

export default Sidenav;
