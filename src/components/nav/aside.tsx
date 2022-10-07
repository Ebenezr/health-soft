import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import axios from "axios";

interface patientInterface {
  national_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  marital_status: string;
  patient_contacts: [
    {
      phone: number;
      email: string;
      address: string;
      county: string;
      estate: string;
    }
  ];
}
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
    name: "Marital Status",
    selector: (row: any) => row.marital_status,
  },
  {
    name: "Gender",
    selector: (row: any) => row.gender,
  },
  {
    name: "Phone",
    selector: (row: any) => row.patient_contacts[0].phone,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.patient_contacts[0].email,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row: any) => row.patient_contacts[0].address,
    sortable: true,
  },
  {
    name: "Estate",
    selector: (row: any) => row.patient_contacts[0].estate,
    sortable: true,
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
    name: "Delete Patient",
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

function DataTableBase() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<patientInterface[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/patients")
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
        title="Patient List"
        columns={columns}
        data={rows}
        dense
        progressPending={pending}
      />
    </div>
  );
}

export default DataTableBase;
