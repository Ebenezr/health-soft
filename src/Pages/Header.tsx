import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("authenticated", JSON.stringify(false));
    localStorage.setItem("token", JSON.stringify(""));
    localStorage.setItem("user", JSON.stringify({}));
    navigate("/login");
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
