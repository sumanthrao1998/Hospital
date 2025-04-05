import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, updatePatient } from "../services/PatientService";  
import "./Form.css";  // Reuse the styling from AddPatientForm

const EditPatientForm = () => {
    const { id } = useParams();  
    const navigate = useNavigate();
    
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        address: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch patient details by ID
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const data = await getPatientById(id);
                setPatient(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching patient:", error);
                setError("Failed to fetch patient data.");
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePatient(id, patient);
            alert("Patient updated successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error updating patient:", error);
            alert("Failed to update patient.");
        }
    };

    if (loading) return <p>Loading patient data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="form-container">
            <h2>Edit Patient</h2>
            <form onSubmit={handleSubmit} className="patient-form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={patient.firstName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={patient.lastName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={patient.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={patient.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={patient.age}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={patient.address}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-button">
                        Update Patient
                    </button>
                    <button type="button" onClick={() => navigate("/")} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPatientForm;
