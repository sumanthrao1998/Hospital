import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: '',
        specialization: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/doctors/${id}`)
            .then((response) => setDoctor(response.data))
            .catch((error) => console.error('Error fetching doctor:', error));
    }, [id]);

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/doctors/${id}`, doctor)
            .then(() => {
                navigate('/doctors');
            })
            .catch((error) => console.error('Error updating doctor:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Edit Doctor</h2>
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
                <button type="submit" className="btn btn-success">Update Doctor</button>
            </form>
        </div>
    );
};

export default EditDoctor;
