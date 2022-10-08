import React from "react";
import DoctorTBL from "../components/Tables/Doctortable";

const Doctor = () => {
  return (
    <section className="panel__main">
      <h1 className="section__title">Doctors List</h1>
      <div className="section__header">
        <button>Add</button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <DoctorTBL />
      </div>
    </section>
  );
};

export default Doctor;
