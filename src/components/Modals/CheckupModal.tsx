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
  currentUser: checkupInterface;
}

const CheckupModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  currentUser,
}) => {
  const [doctorchoice, setDoctorChoice] = useState(0);

  const [patienttypechoice, setPatienttypechoice] = useState("");
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
  const [vitalsForm, setVitalForm] = useState<patientVitals>({
    id: 0,
    temperature: 0,
    bp_systolic: 0,
    bp_diastolic: 0,
    notes: "",
  });

  //get patients vitals
  const getvitals = () => {
    console.log(currentUser);
    try {
      axios
        .get(`http://127.0.0.1:3000/patient_vitals/${currentUser?.patient_id}`)
        .then((res: any) => {
          setVitalForm(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  openModal && getvitals();

  useEffect(() => {
    setFormData(currentUser);

    try {
      const arr: any = [];
      axios.get("http://127.0.0.1:3000/doctors").then((res: any) => {
        let results = res.data;
        results.map((user: userInterface) => {
          return arr.push({ value: user.id, label: user.fullname });
        });
        setDoctors(arr);
      });
    } catch (err) {
      console.error(err);
    }
  }, [currentUser]);
  //hangle change event
  const handleChangeVitals = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setVitalForm({ ...vitalsForm, [key]: value });
  };
  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setFormData({ ...formData, [key]: value });
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
                options={patients}
                noOptionsMessage={() => "patient not found"}
                onChange={(event: any) => setPatientChoice(event.value)}
                value={patients.find((obj) => obj.value === patientchoice)}
                // onBlur={() =>
                //   setFormData({ ...formData, patient_id: patientchoice })
                // }
              />
            </span>
            {/* <span className="input_group">
              <Label htmlFor="patient" css={{ lineHeight: "35px" }}>
                Patient Type
              </Label>
              <Select
                id="doctor_id"
                className="input-cont "
                placeholder="Select Type"
                //defaultInputValue={currentUser?.patient?.patient_type}
                //options={patienttype}
                noOptionsMessage={() => "Choice not found"}
                onChange={(event: any) => setPatienttypechoice(event.value)}
                //value={patienttype.find(
                //(obj) => obj.value === patienttypechoice
                //)}
                // onBlur={() =>
                //   setFormData({ ...formData, patient_type: patienttypechoice })
                // }
              />
            </span> */}
            <span className="input_group">
              <Label htmlFor="doctor" css={{ lineHeight: "35px" }}>
                Doctor
              </Label>
              <Select
                // id="doctor_id"
                defaultInputValue={currentUser?.doctor?.fullname}
                className="input-cont "
                placeholder="Select Doctor"
                options={doctors}
                noOptionsMessage={() => "Doctor not found"}
                onChange={(event: any) => setDoctorChoice(event.value)}
                value={doctors.find((obj) => obj.value === doctorchoice)}
                // onBlur={() =>
                //   setFormData({ ...formData, doctor_id: doctorchoice })
                // }
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
                <div className="form">
                  <span className="input_group notes">
                    <Label htmlFor="symptoms" css={{ lineHeight: "30px" }}>
                      Symptoms
                    </Label>
                    <textarea rows={3} id="symptoms" />
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="diagnosis" css={{ lineHeight: "30px" }}>
                      Diagnosis
                    </Label>
                    <textarea rows={2} id="diagnosis" />
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="hpi" css={{ lineHeight: "30px" }}>
                      HPI
                    </Label>
                    <textarea rows={3} id="hpi" />
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="examination" css={{ lineHeight: "30px" }}>
                      Physical Examinations
                    </Label>
                    <textarea rows={3} id="examination" />
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className="form">
                  <span className="input_group">
                    <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                      Temperature(°C)
                    </Label>

                    <input
                      type="number"
                      id="temperature"
                      className="inputs"
                      value={vitalsForm.temperature}
                      onChange={handleChangeVitals}
                    ></input>
                  </span>
                  <span className="input_group">
                    <Label htmlFor="bp_systolic" css={{ lineHeight: "35px" }}>
                      BP Systolic
                    </Label>
                    <input
                      type="number"
                      id="bp_systolic"
                      className="inputs"
                      value={vitalsForm.bp_systolic}
                      onChange={handleChangeVitals}
                    ></input>
                  </span>
                  <span className="input_group">
                    <Label htmlFor="bp_diastolic" css={{ lineHeight: "35px" }}>
                      BP Diasyolic
                    </Label>

                    <input
                      type="number"
                      id="bp_diastolic"
                      className="inputs"
                      value={vitalsForm.bp_diastolic}
                      onChange={handleChangeVitals}
                    ></input>
                  </span>
                  <span className="input_group notes">
                    <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
                      Nurse Notes
                    </Label>
                    <textarea
                      rows={4}
                      id="notes"
                      value={vitalsForm.notes}
                      onChange={handleChangeVitals}
                    />
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="tab3"></TabsContent>
            </Tabs>
          </div>
        </article>
        <footer className="modal-footer">
          <button className="btn save">Action</button>
          <button className="btn close" onClick={closeModal}>
            Close
          </button>
        </footer>
      </motion.section>
    </motion.div>
  );
};

export default CheckupModal;
