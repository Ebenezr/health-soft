import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { patientVitals, userInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import VitalsModal from "../Modals/patientVitalsModal";

function TriageTBL() {
  const [openModal, setOpenModal] = useState(false);
  const [vitals, setVitals] = useState<patientVitals>({});
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<userInterface[]>([]);

  const handleEdit = (row: patientVitals) => {
    setVitals(row);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    let deluser = rows?.filter((user: patientVitals) => user?.id !== id);
    setRows(deluser);
    Axios.delete(`/patient_vitals/${id}`).then((res) => {});
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
      name: "Patient",
      selector: (row: any) => row?.patient?.fullname,
      sortable: true,
    },
    {
      name: "Temperature",
      selector: (row: any) => row?.temperature,
      sortable: true,
    },
    {
      name: "Bp Systolic",
      selector: (row: any) => row?.bp_systolic,
    },
    {
      name: "Bp Diastolic",
      selector: (row: any) => row?.bp_diastolic,
    },
    {
      name: "Notes",
      selector: (row: any) => row?.notes,
    },
    {
      name: "Edit",
      button: true,
      cell: (row: patientVitals) => (
        <motion.button
          className="table-btn edit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleEdit(row)}
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
            handleDelete(row?.id);
          }}
        >
          Delete
        </motion.button>
      ),
    },
  ];

  useEffect(() => {
    try {
      Axios.get("/patient_vitals")
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
      <VitalsModal
        vitals={vitals}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default TriageTBL;
