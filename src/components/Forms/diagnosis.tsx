import { Label } from "../Radix/Label";
import Axios from "../../app/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { checkupInterface, patientVitals } from "../../interfaces/interfaces";

interface props {
  currentPatient?: checkupInterface;
  checkUpData?: checkupInterface;
  setFormData(obj): void;
}

const Diagnosisform: React.FC<props> = ({
  currentPatient,
  checkUpData,
  setFormData,
}) => {
  //get patients diagnosis
  async function getData(id: number) {
    const { data } = await Axios.get(`/checkups/${id}`);
    return data;
  }

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setFormData({ ...checkUpData, [key]: value });
  };

  return (
    <>
      <div className="form">
        <span className="input_group notes">
          <Label htmlFor="symptoms" css={{ lineHeight: "30px" }}>
            Symptoms
          </Label>
          <textarea
            rows={3}
            id="symptoms"
            value={checkUpData?.symptoms}
            onChange={handleChange}
          />
        </span>
        <span className="input_group notes">
          <Label htmlFor="diagnosis" css={{ lineHeight: "30px" }}>
            Diagnosis
          </Label>
          <textarea
            rows={2}
            id="diagnosis"
            value={checkUpData?.diagnosis}
            onChange={handleChange}
          />
        </span>
        <span className="input_group notes">
          <Label htmlFor="hpi" css={{ lineHeight: "30px" }}>
            HPI
          </Label>
          <textarea
            rows={3}
            id="hpi"
            value={checkUpData?.hpi}
            onChange={handleChange}
          />
        </span>
        <span className="input_group notes">
          <Label htmlFor="examination" css={{ lineHeight: "30px" }}>
            Physical Examinations
          </Label>
          <textarea
            rows={3}
            id="examination"
            value={checkUpData?.examination}
            onChange={handleChange}
          />
        </span>
      </div>
    </>
  );
};

export default Diagnosisform;
