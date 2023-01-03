import { Dayjs } from "dayjs";

export interface patientInterface {
  id?: number;
  nationalId?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  maritalStatus?: string;
  fullName?: string;
  phone?: number;
  email?: string;
  address?: string;
  county?: string;
  estate?: string;
}

export interface userInterface {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: number;
  email?: string;
  designation?: string;
  role?: string;
  featured_image?: {};
  password?: string;
  fullName?: string;
}

export interface appointmentInterface {
  id?: number;
  patientType?: string;
  serial_no?: number;
  appointmentdate?: Dayjs;
  appointmentTime?: Dayjs;
  doctorID?: number;
  patientID?: number;
  nurseID?: number;
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
  patientID?: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  temperature?: number;
  notes?: string;
  patient?: {
    id?: 1;
    national_id?: number;
    first_name?: string;
    last_name?: string;
    fullName?: string;
  };
}

export interface checkupInterface {
  doctorID?: number;
  patientID?: number;
  id?: number;
  examination?: string;
  visit_id?: number;
  symptoms?: string;
  diagnosis?: string;
  advice?: string;
  checkupDate?: string;
  nextVisit?: string;
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
