import React from "react";
import TriageTBL from "../components/Tables/TriageTBL";

const Triage = () => {
  return (
    <section className="panel__main">
      <h1 className="section__title">Patient Vitals Summary</h1>
      <div className="section__header">
        <button>Add</button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <TriageTBL />
      </div>
    </section>
  );
};

export default Triage;
