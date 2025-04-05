import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicalRecords.css';  // Import the CSS file

const MedicalRecordList = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/medical-records');
                console.log('Fetched Records:', response.data);
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching records:', error);
                setError('Failed to fetch records.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="records-container">
            <h2 className="records-title">Medical Records</h2>

            <div className="table-wrapper">
                <table className="records-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Diagnosis</th>
                            <th>Treatment</th>
                            <th>Prescription</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Patient Name</th>
                            <th>Patient Email</th>
                            <th>Patient Phone</th>
                            <th>Patient Age</th>
                            <th>Patient Gender</th>
                            <th>Patient Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? (
                            records.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>{record.diagnosis}</td>
                                    <td>{record.treatment}</td>
                                    <td>{record.prescription || 'N/A'}</td>
                                    <td>{record.createdAt ? new Date(record.createdAt).toLocaleString() : 'N/A'}</td>
                                    <td>{record.updatedAt ? new Date(record.updatedAt).toLocaleString() : 'N/A'}</td>
                                    <td>{record.patient?.firstName} {record.patient?.lastName}</td>
                                    <td>{record.patient?.email}</td>
                                    <td>{record.patient?.phone}</td>
                                    <td>{record.patient?.age}</td>
                                    <td>{record.patient?.gender}</td>
                                    <td>{record.patient?.address}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="no-records">
                                    No medical records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicalRecordList;
