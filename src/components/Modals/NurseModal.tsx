import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { padding } from "@mui/system";
import { Label } from "../Radix/Label";
import { userInterface } from "../../interfaces/interfaces";
import axios from "axios";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface ModalProps {
  openModal: boolean;
  closeModal(): void;
  currentUser: userInterface;
}

const NurseModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  currentUser,
}) => {
  //hold user data
  const [formData, setFormData] = useState<userInterface>({
    first_name: "",
    last_name: "",
    phone: 0,
    email: "",
    designation: "",
    role: "",
    featured_image: {},
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;

    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  //handle form submission
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const post_nurse_url: string = "http://127.0.0.1:3000/nurses";
    // const post_doctor_url: string = "http://127.0.0.1:3000/doctors";
    //if currentUser object if empty do a post operation otherwise patch request
    if (JSON.stringify(currentUser) === "{}") {
      try {
        axios
          .post("http://127.0.0.1:3000/nurses", formData)
          .then((response) => {
            console.log(response.data);
          });
      } catch (err) {
        console.error(err);
      }

      return;
    }
    try {
      axios
        .patch(`http://127.0.0.1:3000/nurses/${currentUser.id}`, formData)
        .then((response) => {
          console.log(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  if (!openModal) return null;
  return (
    <motion.div
      className="overlay"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ width: "clamp(40%, 400px, 60%)" }}
      >
        <header className="modal-header">
          <h2>User Info</h2>
          <button>
            <AiFillCloseSquare
              className="modal-close-icon"
              onClick={closeModal}
            />
          </button>
        </header>
        <article style={{ gridTemplateColumns: "1fr", padding: "2rem" }}>
          <div className="left form">
            <span className="input_group">
              <Label htmlFor="first_name" css={{ lineHeight: "35px" }}>
                First Name
              </Label>

              <input
                type="text"
                id="first_name"
                className="inputs"
                onChange={handleChange}
                value={formData?.first_name}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="last_name" css={{ lineHeight: "35px" }}>
                Last Name
              </Label>
              <input
                type="text"
                id="last_name"
                className="inputs"
                onChange={handleChange}
                value={formData?.last_name}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="phone" css={{ lineHeight: "35px" }}>
                Phone Number
              </Label>
              <input
                type="number"
                id="phone"
                className="inputs"
                onChange={handleChange}
                value={formData?.phone}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="email" css={{ lineHeight: "35px" }}>
                Email
              </Label>
              <input
                type="email"
                id="email"
                className="inputs"
                onChange={handleChange}
                value={formData?.email}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="designation" css={{ lineHeight: "35px" }}>
                Designation
              </Label>

              <input
                type="text"
                id="designation"
                className="inputs"
                onChange={handleChange}
                value={formData?.designation}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="password" css={{ lineHeight: "35px" }}>
                Password
              </Label>
              <input
                type="password"
                id="password"
                className="inputs"
                onChange={handleChange}
                value={formData?.password}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="cpassword" css={{ lineHeight: "35px" }}>
                Cornfirm Password
              </Label>
              <input
                type="password"
                id="cpassword"
                className="inputs"
                onChange={handleChange}
                value={formData?.cpassword}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="featured_image" css={{ lineHeight: "35px" }}>
                Profile Picture
              </Label>
              <input
                id="featured_image"
                type="file"
                accept="image/*"
                multiple={false}
                onChange={handleChange}
                //value={formData?.featured_image}
                //files={formData?.featured_image}
              />
            </span>
          </div>
        </article>
        <footer className="modal-footer">
          <button className="btn save" onClick={handleSubmit}>
            Action
          </button>
          <button className="btn close" onClick={closeModal}>
            Close
          </button>
        </footer>
      </motion.section>
    </motion.div>
  );
};

export default NurseModal;
