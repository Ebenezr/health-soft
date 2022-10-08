export interface patientInterface {
  id?: number;
  national_id?: number;
  first_name?: string;
  last_name?: string;
  gender?: string;
  dob?: string;
  marital_status?: string;
  patient_contacts?: [
    {
      phone?: number;
      email?: string;
      address?: string;
      county?: string;
      estate?: string;
    }
  ];
}

export interface userInterface {
  first_name?: string;
  last_name?: string;
  phone?: number;
  email?: string;
  designation?: string;
  role?: string;
}

export interface appointmentInterface {
  id?: number;
  patient_type?: string;
  serial_no?: number;
  appointment_date?: string;
  appointment_time?: string;
  doctor_id?: number;
  patient_id?: number;
  nurse_id?: number;
  doctor?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    designation?: string;
    role?: string;
  };
  patient: {
    id?: 1;
    national_id?: number;
    first_name?: string;
    last_name?: string;
    gender?: string;
    dob?: string;
    marital_status?: string;
  };
}

export interface patientVitals {
  patient?: string;
  temperature?: number;
  bp_systolic?: number;
  bp_diastolic?: number;
  notes?: string;
}
