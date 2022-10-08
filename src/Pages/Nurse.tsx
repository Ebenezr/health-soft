import React from "react";
import NurseTBL from "../components/Tables/NurseTBL";

const Nurse = () => {
  return (
    <section className="panel__main">
      <h1 className="section__title">Nurses List</h1>
      <div className="section__header">
        <button>Add</button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <NurseTBL />
      </div>
    </section>
  );
};

export default Nurse;
