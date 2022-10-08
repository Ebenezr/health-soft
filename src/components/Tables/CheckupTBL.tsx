import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { checkupInterface, userInterface } from "../../interfaces/interfaces";

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
    name: "Visit Id",
    selector: (row: any) => row.visit_id,
  },
  {
    name: "Doctor",
    selector: (row: any) => row.doctor.fullname,
    sortable: true,
  },
  {
    name: "Patient",
    selector: (row: any) => row.patient.fullname,
    sortable: true,
  },
  {
    name: "Symptoms",
    selector: (row: any) => row.symptoms,
  },
  {
    name: "Diagnosis",
    selector: (row: any) => row.diagnosis,
  },
  {
    name: "Check Up Date",
    selector: (row: any) => row.checkup_date,
  },
  {
    name: "Next Visit",
    selector: (row: any) => row.next_visit,
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

function CheckupTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<checkupInterface[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/checkups")
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

export default CheckupTBL;
