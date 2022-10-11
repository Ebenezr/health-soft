import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { checkupInterface, userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import CheckupModal from "../Modals/CheckupModal";

function CheckupTBL() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<checkupInterface[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<checkupInterface>({});

  const handleDelete = (id: number) => {
    let deluser = rows?.filter((user: userInterface) => user?.id !== id);
    setRows(deluser);
    Axios.delete(`/checkups/${id}`).then((res) => {});
  };

  //handle edit
  const handleEdit = (row: checkupInterface) => {
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
      name: "Visit Id",
      selector: (row: any) => row?.visit_id,
    },
    {
      name: "Doctor",
      selector: (row: any) => row?.doctor?.fullname,
      sortable: true,
    },
    {
      name: "Patient",
      selector: (row: any) => row?.patient?.fullname,
      sortable: true,
    },
    {
      name: "Symptoms",
      selector: (row: any) => row?.symptoms,
    },
    {
      name: "Diagnosis",
      selector: (row: any) => row?.diagnosis,
    },
    {
      name: "Check Up Date",
      selector: (row: any) => row?.checkup_date,
    },
    {
      name: "Next Visit",
      selector: (row: any) => row?.next_visit,
    },
    {
      name: "Edit",
      button: true,
      cell: (row: checkupInterface) => (
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
      Axios.get("/checkups")
        .then((res: any) => setRows(res?.data))
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
        title="Patient Vitals"
        columns={columns}
        data={rows}
        dense
        progressPending={pending}
      />
      <CheckupModal
        currentUser={currentUser}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default CheckupTBL;
