import React from "react";
import CheckupTBL from "../components/Tables/CheckupTBL";

const Checkups = () => {
  return (
    <section className="panel__main">
      <h1 className="section__title">Checkup Summary List</h1>
      <div className="section__header">
        <button>Add</button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <CheckupTBL />
      </div>
    </section>
  );
};

export default Checkups;
