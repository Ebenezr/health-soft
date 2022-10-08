import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { userInterface } from "../../interfaces/interfaces";

const columns = [
  {
    name: "Id",
    selector: (row: any) => row.id,
    sortable: true,
    grow: 0,
    right: true,
    style: {
      backgroundColor: "rgba(50, 50, 50, 0.5)",
      color: "white",
    },
  },

  {
    name: "Patient",
    selector: (row: any) => row.patient.fullname,
    sortable: true,
  },
  {
    name: "Temperature",
    selector: (row: any) => row.temperature,
    sortable: true,
  },
  {
    name: "Bp Systolic",
    selector: (row: any) => row.bp_systolic,
  },
  {
    name: "Bp Diastolic",
    selector: (row: any) => row.bp_diastolic,
  },
  {
    name: "Notes",
    selector: (row: any) => row.notes,
  },
  {
    name: "Edit",
    button: true,
    cell: () => (
      <button className="table-btn edit" type="button">
        Edit
      </button>
    ),
  },
  {
    name: "Delete",
    button: true,
    cell: () => (
      <button
        className="table-btn delete"
        type="button"
        onClick={() => {
          alert("mbuss");
        }}
      >
        Delete
      </button>
    ),
  },
];

function TriageTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<userInterface[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/patient_vitals")
        .then((res: any) => setRows(res.data))
        .then(() => {
          setPending(false);
        });
    } catch (err) {
      console.error(err);
    }
    //console.log(rows[0].patient_contacts[0].phone);
  }, []);

  return (
    <div className="table">
      <DataTable
        title="Patient Vitals"
        columns={columns}
        data={rows}
        dense
        progressPending={pending}
      />
    </div>
  );
}

export default TriageTBL;
