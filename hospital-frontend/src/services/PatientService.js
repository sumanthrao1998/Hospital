import axios from "axios";

const BASE_URL = "http://localhost:8080/api/patients";  // Your backend endpoint

// Get All Patients
export const getPatients = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching patients:", error);
        throw error;
    }
};

// Get Patient by ID
export const getPatientById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient by ID:", error);
        throw error;
    }
};

// Create New Patient
export const createPatient = async (patient) => {
    try {
        const response = await axios.post(BASE_URL, patient);
        return response.data;
    } catch (error) {
        console.error("Error creating patient:", error);
        throw error;
    }
};

// Update Patient
export const updatePatient = async (id, patient) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, patient);
        return response.data;
    } catch (error) {
        console.error("Error updating patient:", error);
        throw error;
    }
};

// Delete Patient
export const deletePatient = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting patient:", error);
        throw error;
    }
};
