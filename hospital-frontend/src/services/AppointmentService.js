import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/appointments';  // Backend API URL

// Fetch all appointments
export const getAppointments = () => axios.get(BASE_URL);

// Get a single appointment by ID
export const getAppointmentById = (id) => axios.get(`${BASE_URL}/${id}`);

// Add a new appointment
export const addAppointment = (appointment) => axios.post(BASE_URL, appointment);

// Update an appointment by ID
export const updateAppointment = (id, appointment) => axios.put(`${BASE_URL}/${id}`, appointment);

// Delete an appointment
export const deleteAppointment = (id) => axios.delete(`${BASE_URL}/${id}`);
