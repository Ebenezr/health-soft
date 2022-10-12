import { Label } from "../Radix/Label";
import Axios from "../../Api/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { checkupInterface, patientVitals } from "../../interfaces/interfaces";

interface props {
  currentPatient: checkupInterface;
}

const Diagnosisform: React.FC<props> = ({ currentPatient }) => {
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
  //get patients diagnosis
  async function getData(id: number) {
    const { data } = await Axios.get(`/checkups/${id}`);
    return data;
  }
  //get vitals query
  const { data: checkups } = useQuery(
    ["patientscheckup", currentPatient?.id],
    () => getData(currentPatient?.id),
    {
      enabled: Boolean(currentPatient),
    }
  );

  //hangle change event
  const handleChange = (event: any) => {
    const key = event.target.id;
    const value = event.target.value;
    // patient_contacts[key] = value;

    setFormData({ ...formData, [key]: value });
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
            value={checkups?.symptoms}
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
            value={checkups?.diagnosis}
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
            value={checkups?.hpi}
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
            value={checkups?.examination}
            onChange={handleChange}
          />
        </span>
      </div>
    </>
  );
};

export default Diagnosisform;
