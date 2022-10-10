import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { patientInterface, userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import DoctorModal from "../Modals/DoctorModal";
import { display } from "@mui/system";

function DoctorTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<userInterface[]>([]);
  const [currentUser, setCurrentUser] = useState<userInterface>({});
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (id: number) => {
    let deluser = rows?.filter((user: userInterface) => user?.id !== id);
    setRows(deluser);
    axios.delete(`http://127.0.0.1:3000/doctors/${id}`).then((res) => {});
  };

  const handleEdit = (row: userInterface) => {
    setCurrentUser(row);
    setOpenModal(true);
  };
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
      cell: (row: any) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleEdit(row)}
          className="table-btn edit"
          type="button"
        >
          Edit
        </motion.button>
      ),
    },
    {
      name: "Delete",
      button: true,
      cell: (row: any) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="table-btn delete"
          type="button"
          onClick={() => {
            handleDelete(row.id);
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
        .get("http://127.0.0.1:3000/doctors")
        .then((res: any) => setRows(res.data))
        .then(() => {
          setPending(false);
        });
    } catch (err) {
      console.error(err);
    }
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
      <DoctorModal
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default DoctorTBL;
