import React, { useState } from 'react';
import axios from 'axios';
import './MedicalRecords.css';
import { useNavigate } from 'react-router-dom';

const AddMedicalRecord = () => {
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [prescription, setPrescription] = useState('');
    const [patientId, setPatientId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recordData = {
            diagnosis,
            treatment,
            prescription
        };

        try {
            await axios.post(
                `http://localhost:8080/api/medical-records?patientId=${patientId}`,
                recordData
            );
            alert('Medical record added successfully!');
            navigate('/medical-records');  // Redirect to the list after successful submission
        } catch (error) {
            console.error('Error adding medical record:', error);
            
            // Improved error handling
            if (error.response) {
                const errorMessage = error.response.data?.message || 'Failed to add record. Please check the patient ID.';
                setError(errorMessage);
            } else {
                setError('Failed to connect to the server. Please try again.');
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Add Medical Record</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Diagnosis:</label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        required
                        placeholder="Enter diagnosis"
                    />
                </div>

                <div className="form-group">
                    <label>Treatment:</label>
                    <input
                        type="text"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        required
                        placeholder="Enter treatment"
                    />
                </div>

                <div className="form-group">
                    <label>Prescription:</label>
                    <input
                        type="text"
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        placeholder="Enter prescription (optional)"
                    />
                </div>

                <div className="form-group">
                    <label>Patient ID:</label>
                    <input
                        type="number"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                        placeholder="Enter patient ID"
                    />
                </div>

                <button type="submit" className="submit-btn">Add Record</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default AddMedicalRecord;
