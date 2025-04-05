import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        doctorName: '',
        phone: '',
        email: '',
        reason: '',
        appointmentDate: new Date()
    });

    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // ✅ Fetch doctor names for dropdown
    useEffect(() => {
        axios.get('http://localhost:8080/api/doctors')  // Backend doctor endpoint
            .then(res => setDoctors(res.data))
            .catch(err => console.error('Error fetching doctors:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, appointmentDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const payload = {
            phone: formData.phone,
            email: formData.email,
            reason: formData.reason,
            appointmentDate: formData.appointmentDate,
            doctor: { name: formData.doctorName }  // ✅ Send doctor name
        };

        try {
            const res = await axios.post('http://localhost:8080/api/appointments', payload);
            setSuccess(res.data);
            setFormData({
                doctorName: '',
                phone: '',
                email: '',
                reason: '',
                appointmentDate: new Date()
            });
        } catch (err) {
            console.error('Error booking appointment:', err);
            setError(err.response?.data || 'Failed to book appointment');
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Doctor</label>
                    <select
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.name}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="\d{10}"
                        placeholder="Enter 10-digit phone number"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Reason</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter reason"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Appointment Date</label>
                    <DatePicker
                        selected={formData.appointmentDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Book Appointment
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
