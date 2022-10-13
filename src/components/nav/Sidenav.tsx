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
  const [acc, setAcc] = useState<any>({});

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setAcc(loggedUser);
    console.log(acc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(acc);
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
            {acc?.user?.first_name.slice(0, 1)}
            {acc?.user?.last_name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <h2>
          {acc?.first_name} {acc?.last_name}
        </h2>
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
            itemId: "/home/patients",

            elemBefore: () => <FaUserClock />,
          },
          {
            title: "Patient Appointment",
            itemId: "/home/appointments",
            elemBefore: () => <FaClock />,
          },
          {
            title: "Nursing Triage",
            itemId: "/home/triage",
            elemBefore: () => <FaUserNurse />,
          },
          {
            title: "Check Up",
            itemId: "/home/checkup",
            elemBefore: () => <FaStethoscope />,
          },
          {
            title: "User Management",
            itemId: "/home/management",
            elemBefore: () => <FaUnlock />,
            subNav: [
              {
                title: "Doctors",
                itemId: "/home/management/doctors",
                elemBefore: () => <FaStethoscope />,
              },
              {
                title: "Nurses",
                itemId: "/home/management/nurses",
                elemBefore: () => <FaUserNurse />,
              },
              {
                title: "Admins",
                itemId: "/home/management/admins",
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
