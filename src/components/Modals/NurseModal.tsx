import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Label } from "../Radix/Label";
import { userInterface } from "../../interfaces/interfaces";
import Axios from "../../Api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const [status, setStatus] = useState<boolean>(null);
  const queryClient = useQueryClient();
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
    confirm_password: "",
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

  const patchNurse = async (id: number) => {
    await Axios.patch(`/nurses/${id}`, formData);
  };

  const postNurse = async (formData) => {
    await Axios.post(`/nurses`, formData).then((res) => res.data);
  };
  const {
    isLoading,
    mutate: post,

    isError,
  } = useMutation(postNurse, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["nurses"]);
      setStatus(true);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
      setStatus(true);
      setTimeout(() => {
        closeModal();
      }, 1000);
    },
    onError: async (err: any) => {
      setStatus(false);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
    },
  });

  const { mutate: patch, isLoading: load } = useMutation(patchNurse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["nurses"]);
      setStatus(true);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
      setStatus(true);
      setTimeout(() => {
        closeModal();
      }, 1000);
    },
    onError: async (error: any) => {
      //  console.log(error);
      setStatus(false);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
    },
  });

  //handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    //check if edit mode or registration
    if (currentUser === undefined || JSON.stringify(currentUser) === "{}") {
      post(formData);
      return;
    }
    patch(currentUser?.id);
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
          <h2>Nurse Info</h2>
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
                required
                type="text"
                id="first_name"
                name="first_name"
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
                required
                type="text"
                id="last_name"
                name="last_name"
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
                required
                type="number"
                id="phone"
                name="phone"
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
                required
                type="email"
                id="email"
                name="email"
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
                required
                type="text"
                id="designation"
                name="designation"
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
                required
                type="password"
                id="password"
                name="password"
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
                required
                type="password"
                id="confirm_password"
                name="confirm_password"
                className="inputs"
                onChange={handleChange}
                value={formData?.confirm_password}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="featured_image" css={{ lineHeight: "35px" }}>
                Profile Picture
              </Label>
              <input
                required
                name="featured_image"
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
          {status ? (
            <div className="form__status active">Save Success</div>
          ) : status === false ? (
            <div className="form__status">
              Failed To Save Data Check to see if all details are correct
            </div>
          ) : null}
        </article>
        <footer className="modal-footer">
          <button className="btn save" onClick={handleSubmit}>
            {isLoading || load ? "Saving..." : "Save"}
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
