import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import DoctorModal from "../Modals/DoctorModal";

function NurseTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<userInterface[]>([]);
  const [openModal, setOpenModal] = useState(false);

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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="table-btn edit"
          type="button"
          onClick={() => setOpenModal(true)}
        >
          Edit
        </motion.button>
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: () => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="table-btn delete"
          type="button"
          onClick={() => {
            alert("mbuss");
          }}
        >
          Delete
        </motion.button>
      ),
    },
  ];
  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:3000/nurses")
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
        title="Nurse List"
        columns={columns}
        data={rows}
        dense
        progressPending={pending}
      />
      <DoctorModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default NurseTBL;
