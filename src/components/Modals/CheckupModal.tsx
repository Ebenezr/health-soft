import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Radix/Tabs";
import { Label } from "../Radix/Label";
import {
  checkupInterface,
  patientInterface,
  patientVitals,
  userInterface,
} from "../../interfaces/interfaces";
import Select from "react-select";
import Axios from "../../Api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Vitalsform from "../Forms/vitalsform";
import Diagnosisform from "../Forms/diagnosis";

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
  openModal?: boolean;
  closeModal(): void;
  currentUser?: checkupInterface;
}

const CheckupModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  currentUser,
}) => {
  const queryClient = useQueryClient();
  //fetch and populate patients dropdown
  const { data: patientsdata } = useQuery(["patientsdata"], () =>
    getPatients()
  );
  //fetch and populate doctors dropdown
  const { data: doctorsdata } = useQuery(["doctorsdata"], () => getDoctors());
  const [doctorchoice, setDoctorChoice] = useState(0);
  const [doctors, setDoctors] = useState<{ value: number; label: string }[]>(
    []
  );
  const [patients, setPatients] = useState<{ value: number; label: string }[]>(
    []
  );
  const [patientchoice, setPatientChoice] = useState(0);
  const [formData, setFormData] = useState<checkupInterface>({
    doctor_id: 0,
    patient_id: 0,
    visit_id: 0,
    symptoms: "",
    diagnosis: "",
    advice: "",
    checkup_date: "",
    next_visit: "",
    comment: "",
    hpi: "",
    patient: {
      fullname: "",
    },
    doctor: {
      fullname: "",
    },
  });

  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);
  //generate visitid
  function genVisitId() {
    const number = Math.floor(1000 + Math.random() * 10);
    return number;
  }
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

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setFormData({ ...formData, [key]: value });
  };

  const patchCheckup = async (id: number) => {
    await Axios.patch(`/checkups/${id}`, formData).then((res) => {});
  };

  const postCheckup = async (formData) => {
    await Axios.post(`/checkups`, formData).then((res) => {});
  };
  const { mutate: post } = useMutation(postCheckup, {
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(["checkups"]);
      closeModal();
    },
  });

  const { mutate: patch } = useMutation(patchCheckup, {
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(["checkups"]);
      closeModal();
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setFormData({ ...formData, visit_id: genVisitId() });
    console.log(formData);
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
        style={{ height: "70vh" }}
      >
        <header className="modal-header">
          <h2>Doctors CheckUp</h2>
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
              <Label htmlFor="patient" css={{ lineHeight: "35px" }}>
                Patient
              </Label>
              <Select
                // id="patient_id"
                defaultInputValue={currentUser?.patient?.fullname}
                className="input-cont "
                placeholder="Select Patient"
                options={patientsdata}
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
                defaultInputValue={currentUser?.doctor?.fullname}
                className="input-cont "
                placeholder="Select Doctor"
                options={doctorsdata}
                noOptionsMessage={() => "Doctor not found"}
                onChange={(event: any) => setDoctorChoice(event.value)}
                value={doctors.find((obj) => obj.value === doctorchoice)}
                onBlur={() =>
                  setFormData({ ...formData, doctor_id: doctorchoice })
                }
              />
            </span>
            <span className="input_group">
              <Label htmlFor="checkup_date" css={{ lineHeight: "35px" }}>
                Checkup Date
              </Label>
              <input
                type="date"
                id="checkup_date"
                className="inputs"
                onChange={handleChange}
                value={formData?.checkup_date}
              ></input>
            </span>
            <span className="input_group">
              <Label htmlFor="checkup_date" css={{ lineHeight: "35px" }}>
                Next Visit
              </Label>
              <input
                type="date"
                id="next_visit"
                className="inputs"
                onChange={handleChange}
                value={formData?.next_visit}
              ></input>
            </span>
            {/* <span className="input_group">
              <Label htmlFor="checkup_date" css={{ lineHeight: "35px" }}>
                Visit Id
              </Label>
              <input
                type="number"
                disabled
                id="next_visit"
                className="inputs"
                //  onChange={handleChange}
                value={formData?.next_visit}
              ></input>
            </span> */}
            <span className="input_group notes">
              <Label htmlFor="advice" css={{ lineHeight: "30px" }}>
                Advice
              </Label>
              <textarea
                rows={3}
                id="notes"
                onChange={handleChange}
                value={formData?.advice}
              />
            </span>
            <span className="input_group notes">
              <Label htmlFor="comments" css={{ lineHeight: "30px" }}>
                Comments
              </Label>
              <textarea
                rows={3}
                id="notes"
                onChange={handleChange}
                value={formData?.comment}
              />
            </span>
          </div>
          <div className="right form">
            <Tabs defaultValue="tab1">
              <TabsList aria-label="Manage your account">
                <TabsTrigger value="tab1">Chief Compaint</TabsTrigger>
                <TabsTrigger value="tab2">Vital Signs </TabsTrigger>
                <TabsTrigger value="tab3">Treatment</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Diagnosisform
                  checkUpData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>
              <TabsContent value="tab2">
                <Vitalsform patientId={currentUser?.patient_id} />
              </TabsContent>
              <TabsContent value="tab3"></TabsContent>
            </Tabs>
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

export default CheckupModal;
