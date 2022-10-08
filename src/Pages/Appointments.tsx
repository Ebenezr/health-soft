import React from "react";
import AppointmentTable from "../components/Tables/AppoinmentTBL";

const Appointments = () => {
  return (
    <section className="panel__main">
      <h1 className="section__title">Patient Appointment List</h1>
      <div className="section__header">
        <button>Add</button>
        <input type="search" placeholder="Search" />
      </div>
      <div className="section__table">
        <AppointmentTable />
      </div>
    </section>
  );
};

export default Appointments;
