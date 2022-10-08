import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { patientInterface, userInterface } from "../../interfaces/interfaces";

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
    name: "First Name",
    selector: (row: any) => row.first_name,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row: any) => row.last_name,
    sortable: true,
  },
  {
    name: "Designation",
    selector: (row: any) => row.designation,
  },
  {
    name: "Telephone",
    selector: (row: any) => row.phone,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
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

function DoctorTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<userInterface[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/doctors")
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
        title="Doctor List"
        columns={columns}
        data={rows}
        dense
        progressPending={pending}
      />
    </div>
  );
}

export default DoctorTBL;
