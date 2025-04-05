import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/doctors')
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => console.error('Error fetching doctors:', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/doctors/${id}`)
            .then(() => {
                setDoctors(doctors.filter((doctor) => doctor.id !== id));
            })
            .catch((error) => console.error('Error deleting doctor:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Doctors</h2>
            <Link to="/add-doctor" className="btn btn-primary mb-3">Add Doctor</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.email}</td>
                            <td>{doctor.phone}</td>
                            <td>
                                <Link
                                    to={`/edit-doctor/${doctor.id}`}
                                    className="btn btn-warning me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(doctor.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorList;
