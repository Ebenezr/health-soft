import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { motion } from "framer-motion";
import { Label } from "../Radix/Label";
import Select from "react-select";

import Axios from "../../Api/axios";
import {
  appointmentInterface,
  patientInterface,
  userInterface,
} from "../../interfaces/interfaces";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  appointment: any;
}

const AppointmentModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  appointment,
}) => {
  const [time, setTime] = useState();
  //hold user data
  const [formData, setFormData] = useState({
    appointment_date: "",
    appointment_time: "",
    patient_id: 0,
    doctor_id: 0,
    notes: "",
    patient_type: "",
    serial_no: 0,
  });
  const queryClient = useQueryClient();
  const [doctorchoice, setDoctorChoice] = useState(0);

  const [patienttypechoice, setPatienttypechoice] = useState("");
  const [patientchoice, setPatientChoice] = useState(0);
  const patienttype: { value: string; label: string }[] = [
    {
      value: "out-patinet",
      label: "Out Patient",
    },
    {
      value: "in-patinet",
      label: "In Patient",
    },
  ];
  //fetch and populate patients dropdown
  const { data: patients } = useQuery(["patientsdata"], () => getPatients());

  //fetch and populate doctors dropdown
  const {
    data: doctors,
    isLoading,
    refetch,
    error,
  } = useQuery(["doctorsdata"], () => getDoctors());

  //fetch patients
  async function getPatients() {
    const arr: any = [];
    const { data } = await Axios.get("/patients");
    data.map((user: patientInterface) => {
      return arr.push({ value: user.id, label: user.fullname });
    });
    return arr;
  }
  //fetch doctors
  async function getDoctors() {
    const arr: any = [];
    const { data } = await Axios.get("/doctors");
    data.map((user: userInterface) => {
      return arr.push({ value: user.id, label: user.fullname });
    });
    return arr;
  }

  //patch appointments
  const patchAppointments = async (patient_id: number) => {
    await Axios.patch(`/appointments/${patient_id}`, formData).then(
      (res) => res.data
    );
  };

  //post appointment
  const postVitals = async (formData: any) => {
    await Axios.post(`/appointments`, formData).then((res) => res.data);
  };

  //update appoinment query
  const { mutate: patch } = useMutation(patchAppointments, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      closeModal();
      //update details on success response
    },
  });

  //post appointments query
  const { mutate: post } = useMutation(postVitals, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      closeModal();
    },
  });

  useEffect(() => {
    setFormData(appointment);
  }, [appointment]);

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //handle for submision
  const handleSubmit = (event) => {
    event.preventDefault();
    //check if edit mode or registration
    if (appointment === undefined || JSON.stringify(appointment) === "{}") {
      post(formData);
      return;
    }
    patch(appointment?.id);
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
        style={{ width: "clamp(40%, 300px, 70%)" }}
      >
        <header className="modal-header">
          <h2>Modal form</h2>
          <button>
            <AiFillCloseSquare
              className="modal-close-icon"
              onClick={closeModal}
            />
          </button>
        </header>
        <article style={{ gridTemplateColumns: "1fr", padding: "2rem" }}>
          <div className="form">
            <span className="input_group">
              <Label htmlFor="patient" css={{ lineHeight: "35px" }}>
                Patient
              </Label>
              <Select
                // id="patient_id"
                defaultInputValue={appointment?.patient?.fullname}
                className="input-cont "
                placeholder="Select Patient"
                options={patients}
                noOptionsMessage={() => "patient not found"}
                onChange={(event: any) => setPatientChoice(event.value)}
                value={patients.find((obj) => obj.value === patientchoice)}
                onBlur={() =>
                  setFormData({ ...formData, patient_id: patientchoice })
                }
              />
            </span>
            <span className="input_group">
              <Label htmlFor="doctor" css={{ lineHeight: "35px" }}>
                Doctor
              </Label>
              <Select
                // id="doctor_id"
                defaultInputValue={appointment?.doctor?.fullname}
                className="input-cont "
                placeholder="Select Doctor"
                options={doctors}
                noOptionsMessage={() => "Doctor not found"}
                onChange={(event: any) => setDoctorChoice(event.value)}
                value={doctors.find((obj) => obj.value === doctorchoice)}
                onBlur={() =>
                  setFormData({ ...formData, doctor_id: doctorchoice })
                }
              />
            </span>

            <span className="input_group">
              <Label htmlFor="doctor" css={{ lineHeight: "35px" }}>
                Patient Type
              </Label>
              <Select
                id="doctor_id"
                className="input-cont "
                placeholder="Select Type"
                defaultInputValue={appointment?.patient_type}
                options={patienttype}
                noOptionsMessage={() => "Choice not found"}
                onChange={(event: any) => setPatienttypechoice(event.value)}
                value={patienttype.find(
                  (obj) => obj.value === patienttypechoice
                )}
                onBlur={() =>
                  setFormData({ ...formData, patient_type: patienttypechoice })
                }
              />
            </span>
            <span className="input_group">
              <Label htmlFor="appointment_time" css={{ lineHeight: "35px" }}>
                Serial Number
              </Label>

              <input
                type="text"
                disabled
                id="appointment_time"
                className="inputs"
                value={formData?.serial_no}
                onChange={handleChange}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="appointment_date" css={{ lineHeight: "35px" }}>
                Appointment Date
              </Label>

              <input
                type="date"
                id="appointment_date"
                className="inputs"
                value={formData?.appointment_date}
                onChange={handleChange}
              ></input>
            </span>

            <span className="input_group">
              <Label htmlFor="appointment_time" css={{ lineHeight: "35px" }}>
                Appointment Time
              </Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onBlur={() =>
                        setFormData({
                          ...formData,
                          appointment_time: time,
                        })
                      }
                      defaultValue={appointment?.appointment_time}
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
            <span className="input_group notes">
              <Label htmlFor="notes" css={{ lineHeight: "35px" }}>
                Notes
              </Label>
              <textarea
                id="notes"
                className="inputs"
                value={formData?.notes}
                onChange={handleChange}
              ></textarea>
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

export default AppointmentModal;
