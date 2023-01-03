import { useState } from "react";
import DataTable from "./DataTable";
import Axios from "../../Api/axios";
import { patientVitals } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import VitalsModal from "../Modals/patientVitalsModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function TriageTBL() {
  const queryClient = useQueryClient();
  async function getData() {
    const { data } = await Axios.get("/vitals");
    return data?.payload;
  }
  const {
    data: patients,
    isLoading,
    refetch,
    error,
  } = useQuery(["patientsvitals"], () => getData());
  const [openModal, setOpenModal] = useState(false);
  const [vitals, setVitals] = useState<patientVitals>({});

  const handleEdit = (row: patientVitals) => {
    setVitals(row);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    await Axios.delete(`/vital/${id}`).then((res) => {});
  };

  const { mutate: destroy } = useMutation(handleDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["patientsvitals"]);
    },
  });

  const columns = [
    {
      name: "Serial Number",
      selector: (row: any) => row?.patient_id,
      sortable: true,
      grow: 0.7,
      right: true,
      style: {
        backgroundColor: "rgba(50, 50, 50, 0.5)",
        color: "white",
      },
    },

    {
      name: "Patient",
      selector: (row: any) => row?.patient?.fullName,
      sortable: true,
    },
    {
      name: "Temperature",
      selector: (row: any) => row?.temperature,
      sortable: true,
    },
    {
      name: "Bp Systolic",
      selector: (row: any) => row?.bpSystolic,
    },
    {
      name: "Bp Diastolic",
      selector: (row: any) => row?.bpDiastolic,
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
            destroy(row?.patient_id);
          }}
        >
          Delete
        </motion.button>
      ),
    },
  ];

  return (
    <div className="table">
      <DataTable
        columns={columns}
        data={patients}
        dense
        progressPending={isLoading}
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
