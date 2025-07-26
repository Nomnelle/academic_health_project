import { createContext, useContext } from "react";
import type { Patient } from "../types";

export const PatientContext = createContext<Patient | null>(null);
export const usePatient = () => useContext(PatientContext);