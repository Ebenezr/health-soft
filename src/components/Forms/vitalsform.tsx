import { Label } from "../Radix/Label";
import Axios from "../../Api/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { patientVitals } from "../../interfaces/interfaces";

interface vitalsprops {
  id: number;
}

export default function Vitalsform({ id }) {
  const [vitalsForm, setVitalForm] = useState<patientVitals>({
    patient_id: 0,
    temperature: 0,
    bp_systolic: 0,
    bp_diastolic: 0,
    notes: "",
  });
  //get patients vitals
  async function getVitals(id: number) {
    const { data } = await Axios.get(`/patient_vitals/${id}`);
    return data;
  }
  //get vitals query
  const {
    data: patientVitals,
    isLoading,
    refetch,
    error,
  } = useQuery(["patientsvitals"], () => getVitals(id));

  //hangle change event
  const handleChangeVitals = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setVitalForm({ ...vitalsForm, [key]: value });
  };

  return (
    <>
      {" "}
      <div className="form">
        <span className="input_group">
          <Label htmlFor="temperature" css={{ lineHeight: "35px" }}>
            Temperature(°C)
          </Label>

          <input
            type="text"
            id="temperature"
            className="inputs"
            value={patientVitals?.temperature}
            onChange={handleChangeVitals}
          ></input>
        </span>
        <span className="input_group">
          <Label htmlFor="bp_systolic" css={{ lineHeight: "35px" }}>
            BP Systolic
          </Label>
          <input
            type="text"
            id="bp_systolic"
            className="inputs"
            value={patientVitals?.bp_systolic}
            onChange={handleChangeVitals}
          ></input>
        </span>
        <span className="input_group">
          <Label htmlFor="bp_diastolic" css={{ lineHeight: "35px" }}>
            BP Diasyolic
          </Label>

          <input
            type="text"
            id="bp_diastolic"
            className="inputs"
            value={patientVitals?.bp_diastolic}
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
            value={patientVitals?.notes}
            onChange={handleChangeVitals}
          />
        </span>
      </div>{" "}
    </>
  );
}
