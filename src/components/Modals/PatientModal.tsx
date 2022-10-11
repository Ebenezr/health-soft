import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Label } from "../Radix/Label";
import Select from "react-select";
import { patientInterface } from "../../interfaces/interfaces";
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
  currentUser: patientInterface;
}

const PatientModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  currentUser,
}) => {
  const gender: { value: string; label: string }[] = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Memale",
      label: "Female",
    },
  ];
  const married: { value: string; label: string }[] = [
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Maried",
      label: "Married",
    },
  ];
  const [genderchoice, setGender] = useState("");
  const [marriedchoice, setMarriedChoice] = useState("");
  const [formData, setFormData] = useState<patientInterface>({
    national_id: 0,
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    marital_status: "",
    fullname: "",
    phone: 0,
    email: "",
    address: "",
    county: "",
    estate: "",
  });

  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setFormData({ ...formData, [key]: value });
  };
  //handle form submission
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //if currentUser object if empty do a post operation otherwise patch request
    if (JSON.stringify(currentUser) === "{}") {
      try {
        axios
          .post("http://127.0.0.1:3000/patients", formData)
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
        .patch(`http://127.0.0.1:3000/patients/${currentUser.id}`, formData)
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
        style={{ width: "clamp(55%, 60%, 65%)", height: "65vh" }}
      >
        <header className="modal-header">
          <h2>Patient Info Form</h2>
          <button>
            <AiFillCloseSquare
              className="modal-close-icon"
              onClick={closeModal}
            />
          </button>
        </header>
        <article>
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
              <Label htmlFor="national_id" css={{ lineHeight: "35px" }}>
                National ID
              </Label>

              <input
                type="text"
                id="national_id"
                className="inputs"
                onChange={handleChange}
                value={formData?.national_id}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="gender" css={{ lineHeight: "35px" }}>
                Gender
              </Label>
              <Select
                className="input-cont "
                placeholder="Select Type"
                options={gender}
                defaultInputValue={currentUser?.gender}
                noOptionsMessage={() => "Choice not found"}
                onChange={(event: any) => setGender(event.value)}
                value={gender.find((obj) => obj.value === genderchoice)}
                onBlur={() =>
                  setFormData({ ...formData, gender: genderchoice })
                }
              />
            </span>
            <span className="input_group">
              <Label htmlFor="dob" css={{ lineHeight: "35px" }}>
                DOB
              </Label>
              <input
                type="date"
                id="dob"
                className="inputs"
                onChange={handleChange}
                value={formData?.dob}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="marital_status" css={{ lineHeight: "35px" }}>
                Marital Status
              </Label>

              <Select
                className="input-cont "
                placeholder="Select Type"
                options={married}
                defaultInputValue={currentUser?.marital_status}
                noOptionsMessage={() => "Choice not found"}
                onChange={(event: any) => setMarriedChoice(event.value)}
                value={married.find((obj) => obj.value === marriedchoice)}
                onBlur={() =>
                  setFormData({ ...formData, marital_status: marriedchoice })
                }
              />
            </span>
          </div>
          <div className="right form">
            <span className="input_group">
              <Label htmlFor="phone" css={{ lineHeight: "35px" }}>
                Phone Number
              </Label>
              <input
                type="text"
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
                type="eamil"
                id="email"
                className="inputs"
                onChange={handleChange}
                value={formData?.email}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="address" css={{ lineHeight: "35px" }}>
                Address
              </Label>
              <input
                type="text"
                id="address"
                className="inputs"
                onChange={handleChange}
                value={formData?.address}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="county" css={{ lineHeight: "35px" }}>
                County
              </Label>
              <input
                type="text"
                id="county"
                className="inputs"
                onChange={handleChange}
                value={formData?.county}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="estate" css={{ lineHeight: "35px" }}>
                Estate
              </Label>
              <input
                type="text"
                id="estate"
                className="inputs"
                onChange={handleChange}
                value={formData?.estate}
              ></input>
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

export default PatientModal;
