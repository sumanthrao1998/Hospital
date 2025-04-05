import axios from "axios";

const BASE_URL = "http://localhost:8080/api/patients";

// Function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth");
  if (!token) {
    throw new Error("No authentication found. Please log in.");
  }
  return { Authorization: `Bearer ${token}` };
};

// ✅ Fetch patients
export const getPatients = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// ✅ Delete patient function
export const deletePatient = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

// ✅ Logout function
export const logout = () => {
  localStorage.removeItem("auth");
  window.location.href = "/login";
};
