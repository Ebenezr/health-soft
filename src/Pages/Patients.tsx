import React from "react";
import PatientTBL from "../components/Tables/PatientTBL";

const Patients = () => {
  return (
    <section className="panel__main">
      <h1 className="section__title">PatientInfo List</h1>
      <div className="section__header">
        <button>Add</button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <PatientTBL />
      </div>
    </section>
  );
};

export default Patients;
