import React, { useEffect, useState, useRef } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Label } from "../Radix/Label";
import Axios from "../../Api/axios";
import { patientInterface, patientVitals } from "../../interfaces/interfaces";
import Select from "react-select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../Radix/Toast";
import * as ToastPrimitive from "@radix-ui/react-toast";

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
  vitals?: patientVitals;
  patientId?: number;
}

const VitalsModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  vitals,
  patientId,
}) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<boolean>(null);
  const [open, setOpen] = useState(false);
  const [userChoice, setUserChoice] = useState<any>();
  const [formData, setFormData] = useState<patientVitals>({
    patientID: 0,
    temperature: 0,
    bpSystolic: 0,
    bpDiastolic: 0,
    notes: "",
  });

  const timerRef = React.useRef(0);


  useEffect(() => {
    setFormData(vitals);
    return () => clearTimeout(timerRef.current);
  }, [vitals]);
  //handle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //fetch patients
  async function getPatients() {
    const arr: any = [];
    const { data } = await Axios.get("/patients");
    data?.payload.map((user: patientInterface) => {
      return arr.push({ value: user.id, label: user.fullName });
    });
    return arr;
  }
  //fetch and populate patients dropdown
  const { data: patients } = useQuery(["patientsdata"], () => getPatients());

  //patch vitals
  const patchVitals = async (patient_id: number) => {
    await Axios.patch(`/vital/${patient_id}`, formData).then((res) => res.data);
  };

  //post vitals
  const postVitals = async (formData: patientVitals) => {
    await Axios.post(`/vitals`, formData).then((res) => res.data);
  };

  //update patient's vitals query
  const { isLoading: load, mutate: patch } = useMutation(patchVitals, {
    onSuccess: () => {
      queryClient.invalidateQueries(["patientsvitals"]);
      setStatus(true);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
      setStatus(true);
      setTimeout(() => {
        closeModal();
      }, 1000);
    },
    onError: (error: any) => {
      setStatus(false);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
    },
  });

  //post patient's vitals query
  const { isLoading, mutate: post } = useMutation(postVitals, {
    onSuccess: () => {
      queryClient.invalidateQueries(["patientsvitals"]);
      setStatus(true);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
      setStatus(true);
      setTimeout(() => {
        closeModal();
      }, 1000);
    },
    onError: (error: any) => {
      setStatus(false);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
    },
  });

  //submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    //check if edit mode or registration
    if (vitals === undefined || JSON.stringify(vitals) === "{}") {
      post(formData);
      return;
    }
    patch(vitals?.patientID);
  };

  if (!openModal) return null;
  return (
    <ToastProvider swipeDirection="right">
      <motion.div
        className="overlay"
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
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
            <h2>Patient Vitals form</h2>
            <button>
              <AiFillCloseSquare
                className="modal-close-icon"
                onClick={closeModal}
              />
            </button>
          </header>
          <article style={{ gridTemplateColumns: "1fr" }}>
            <div className="form">
              <span className="input_group">
                <Label htmlFor="patient_id" css={{ lineHeight: "35px" }}>
                  Patient
                </Label>

                <Select
                  defaultInputValue={vitals?.patient?.fullName}
                  className="input-cont"
                  placeholder="Select Type"
                  options={patients}
                  noOptionsMessage={() => "Doctor not found"}
                  // onChange={(options: any) =>
                  //   onChange(options?.map((option) => option.value))
                  // }
                  onChange={(event) => {
                    setUserChoice(event?.value);
                  }}
                  onBlur={() =>
                    setFormData({ ...formData, patientID: userChoice })
                  }
                  //    value={patients.find((c) => c.value === value)}

                  value={patients.find((obj) => obj.value === userChoice)}
                  classNamePrefix="select"
                />
              </span>
              <span className="input_group">
                <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                  Temperature(°C)
                </Label>
                <input
                  required
                  type="number"
                  id="temperature"
                  className="inputs"
                  value={formData?.temperature}
                  onChange={handleChange}
                  // {...register("temperature")}
                ></input>
              </span>
              <span className="input_group">
                <Label htmlFor="bp_systolic" css={{ lineHeight: "35px" }}>
                  BP Systolic
                </Label>
                <input
                  type="number"
                  id="bpSystolic"
                  className="inputs"
                  value={formData?.bpSystolic}
                  onChange={handleChange}
                  // {...register("bp_systolic")}
                ></input>
              </span>
              {/* <small>{errors.temperature?.message}</small> */}
              <span className="input_group">
                <Label htmlFor="bp_diastolic" css={{ lineHeight: "35px" }}>
                  BP Diasyolic
                </Label>
                <input
                  type="number"
                  id="bpDiastolic"
                  className="inputs"
                  value={formData?.bpDiastolic}
                  onChange={handleChange}
                  // {...register("bp_diastolic")}
                ></input>
              </span>
              <span className="input_group notes">
                <Label htmlFor="notes" css={{ lineHeight: "35px" }}>
                  Nurse Notes
                </Label>
                <textarea
                  rows={4}
                  id="notes"
                  value={formData?.notes}
                  onChange={handleChange}
                  // {...register("notes")}
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
            <button className="btn save" type="submit">
              {isLoading || load ? "Saving..." : "Save"}
            </button>
            <button className="btn close" onClick={closeModal}>
              Close
            </button>
          </footer>
        </motion.form>
      </motion.div>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription asChild></ToastDescription>
        <ToastAction asChild altText="Goto schedule to undo">
          <button>ok</button>
        </ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

export default VitalsModal;
