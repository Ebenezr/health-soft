import React, { useEffect, useState, useRef } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Label } from "../Radix/Label";
import Axios from "../../Api/axios";
import { patientInterface, patientVitals } from "../../interfaces/interfaces";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

//form validatiion schema
const schema = yup.object().shape({
  temperature: yup
    .number()
    .required("temperature is required")
    .positive()
    .integer()
    .min(33)
    .max(40),
  bp_systolic: yup.number().positive().integer().min(100).max(150),
  bp_diastolic: yup.number().positive().integer().min(50).max(100),
  notes: yup.string(),
});

//.oneOf([yup.ref('password),null])

interface ModalProps {
  openModal: boolean;
  closeModal(): void;
  vitals: patientVitals;
}

const VitalsModal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  vitals,
}) => {
  // const {
  //   setValue,
  //   watch,
  //   reset,
  //   control,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onBlur",
  //   reValidateMode: "onChange",
  //   shouldUnregister: true,
  //   resolver: yupResolver(schema),
  // });
  const [userChoice, setUserChoice] = useState<any>();
  const [formData, setFormData] = useState<patientVitals>({
    patient_id: 0,
    temperature: 0,
    bp_systolic: 0,
    bp_diastolic: 0,
    notes: "",
  });
  const [patients, setPatients] = useState<{ value: number; label: string }[]>(
    []
  );

  useEffect(() => {
    setFormData(vitals);
    console.log(vitals);
    const arr: any = [];
    Axios.get("/patients").then((res: any) => {
      let results = res.data;
      results.map((user: patientInterface) => {
        return arr.push({ value: user.id, label: user.fullname });
      });
      setPatients(arr);
    });
  }, [vitals]);
  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //submission

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);

    // if (vitals?.patient_id === undefined || vitals?.patient_id === 0) {
    //   try {
    //     await Axios.post("/patient_vitals", formData).then((res) => {
    //       console.log(res.data);
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   }

    //   return;
    // }
    // try {
    //   await Axios.post(`/patient_vitals/${vitals?.patient_id}`, formData).then(
    //     (res) => {
    //       console.log(res.data);
    //     }
    //   );
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const onSubmit = () => {
    //  console.log(data);
    console.log(formData);
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
                defaultInputValue={vitals?.patient?.fullname}
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
                  setFormData({ ...formData, patient_id: userChoice })
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
                id="bp_systolic"
                className="inputs"
                value={formData?.bp_systolic}
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
                id="bp_diastolic"
                className="inputs"
                value={formData?.bp_diastolic}
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
        </article>
        <footer className="modal-footer">
          <button className="btn save" type="submit">
            Action
          </button>
          <button className="btn close" onClick={closeModal}>
            Close
          </button>
        </footer>
      </motion.form>
    </motion.div>
  );
};

export default VitalsModal;
