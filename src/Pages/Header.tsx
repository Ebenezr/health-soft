import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Axios from "../app/api";
import { useMutation } from "@tanstack/react-query";
const Header = () => {
  const navigate = useNavigate();
  const [acc, setAcc] = useState<any>({});

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setAcc(loggedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //login post request
  const logOut = async (id: number) => {
    await Axios.delete(`/users/${id}`).then((res) => {
      localStorage.setItem("user", JSON.stringify({}));
      localStorage.setItem("token", JSON.stringify(""));
      localStorage.setItem("role", JSON.stringify(""));
    });
  };

  const { mutate: signout } = useMutation(logOut, {
    onMutate: () => {
      navigate("/login");
      localStorage.setItem("authenticated", JSON.stringify(false));
    },
  });
  const logout = () => {
    signout(acc.id);
  };
  return (
    <header className="main-header">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="signout"
        onClick={logout}
      >
        Sign out
      </motion.button>
    </header>
  );
};

export default Header;
