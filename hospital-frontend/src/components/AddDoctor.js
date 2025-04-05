import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: '',
        specialization: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/doctors', doctor)
            .then(() => {
                navigate('/doctors');
            })
            .catch((error) => console.error('Error adding doctor:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={doctor.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Specialization:</label>
                    <input
                        type="text"
                        name="specialization"
                        value={doctor.specialization}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={doctor.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={doctor.phone}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Doctor</button>
            </form>
        </div>
    );
};

export default AddDoctor;
