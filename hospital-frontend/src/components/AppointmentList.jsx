import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentList.css';  // Import the CSS file

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/appointments')
            .then(res => {
                setAppointments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching appointments:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="appointment-container">
            <h2 className="appointment-title">Appointment List</h2>

            <div className="overflow-x-auto">
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Reason</th>
                            <th>Appointment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.doctor?.name || 'N/A'}</td>
                                    <td>{appointment.phone}</td>
                                    <td>{appointment.email}</td>
                                    <td>{appointment.reason}</td>
                                    <td>
                                        {new Date(appointment.appointmentDate).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-appointments">
                                    No appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentList;
