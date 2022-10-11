import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { patientInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import PatientModal from "../Modals/PatientModal";

function PatientTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<patientInterface[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<patientInterface>({});

  const handleDelete = (id: number) => {
    let deluser = rows?.filter((user: patientInterface) => user?.id !== id);
    setRows(deluser);
    Axios.delete(`/patients/${id}`).then((res) => {});
  };

  //handle edit
  const handleEdit = (row: patientInterface) => {
    setCurrentUser(row);
    setOpenModal(true);
  };

  const columns = [
    {
      name: "Id",
      selector: (row: any) => row?.id,
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
      selector: (row: any) => row?.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: any) => row?.last_name,
      sortable: true,
    },
    {
      name: "Marital Status",
      selector: (row: any) => row?.marital_status,
    },
    {
      name: "Gender",
      selector: (row: any) => row?.gender,
    },
    {
      name: "Phone",
      selector: (row: any) => row?.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row?.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row: any) => row?.address,
      sortable: true,
    },
    {
      name: "Estate",
      selector: (row: any) => row.estate,
      sortable: true,
    },
    {
      name: "Edit",
      button: true,
      cell: (row: any) => (
        <motion.button
          className="table-btn edit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleEdit(row)}
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
        <button
          className="table-btn delete"
          type="button"
          onClick={() => {
            handleDelete(row?.id);
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  useEffect(() => {
    try {
      Axios
        .get("/patients")
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
      <DataTable columns={columns} data={rows} progressPending={pending} />
      <PatientModal
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default PatientTBL;
