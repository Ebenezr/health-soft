import { Dayjs } from "dayjs";

export interface patientInterface {
  id?: number;
  national_id?: number;
  first_name?: string;
  last_name?: string;
  gender?: string;
  dob?: string;
  marital_status?: string;
  fullname?: string;
  phone?: number;
  email?: string;
  address?: string;
  county?: string;
  estate?: string;
}

export interface userInterface {
  id?: number;
  first_name?: string;
  last_name?: string;
  phone?: number;
  email?: string;
  designation?: string;
  role?: string;
  featured_image?: {};
  password?: string;
  cpassword?: string;
  fullname?: string;
}

export interface appointmentInterface {
  id?: number;
  patient_type?: string;
  serial_no?: number;
  appointment_date?: Dayjs;
  appointment_time?: Dayjs;
  doctor_id?: number;
  patient_id?: number;
  nurse_id?: number;
  notes?: string;
  doctor?: {
    fullname?: string;
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    designation?: string;
  };
  patient?: {
    fullname?: string;
    id?: 1;
    national_id?: number;
    first_name?: string;
    last_name?: string;
    gender?: string;
  };
}

export interface patientVitals {
  id?: number;
  patient_id?: number;
  bp_systolic?: number;
  bp_diastolic?: number;
  temperature?: number;
  notes?: string;
  patient?: {
    id?: 1;
    national_id?: number;
    first_name?: string;
    last_name?: string;
    fullname?: string;
  };
}

export interface checkupInterface {
  doctor_id?: number;
  patient_id?: number;
  id?: number;
  examination?: string;
  visit_id?: number;
  symptoms?: string;
  diagnosis?: string;
  advice?: string;
  checkup_date?: string;
  next_visit?: string;
  comment?: string;
  hpi?: string;
  patient?: {
    fullname?: string;
    id?: number;
  };
  doctor?: {
    fullname?: string;
    id?: number;
  };
}
