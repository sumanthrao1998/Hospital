import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Ensure you have the CSS file for styling

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Hospital Management System</h1>
            
            <div className="modules-container">

                {/* ✅ Patient Module */}
                <div className="module-card">
                    <h2>Patients</h2>
                    <p>Manage patient records, add new patients, and update their details.</p>
                    <div className="btn-group">
                        <Link to="/patients" className="btn">View Patients</Link>
                        <Link to="/add-patient" className="btn">Add Patient</Link>
                    </div>
                </div>

                {/* ✅ Appointment Booking Module */}
                <div className="module-card">
                    <h2>Appointments</h2>
                    <p>Book, view, and manage patient appointments with doctors.</p>
                    <div className="btn-group">
                        <Link to="/appointments" className="btn">View Appointments</Link>
                        <Link to="/add-appointment" className="btn">Book Appointment</Link>
                    </div>
                </div>

                {/* ✅ Doctor Module */}
                <div className="module-card">
                    <h2>Doctors</h2>
                    <p>Manage doctors, their specializations, and contact information.</p>
                    <div className="btn-group">
                        <Link to="/doctors" className="btn">View Doctors</Link>
                        <Link to="/add-doctor" className="btn">Add Doctor</Link>
                    </div>
                </div>

                {/* ✅ Medical Records Module */}
                <div className="module-card">
                    <h2>Medical Records</h2>
                    <p>Manage patient medical records, diagnoses, and treatments.</p>
                    <div className="btn-group">
                        <Link to="/medical-records" className="btn">View Records</Link>
                        <Link to="/add-record" className="btn">Add Record</Link>
                    </div>
                </div>

                {/* ✅ Billing Module */}
                <div className="module-card">
                    <h2>Billing</h2>
                    <p>Manage invoices, create new invoices, and track payments.</p>
                    <div className="btn-group">
                        <Link to="/billings" className="btn">View Invoices</Link>   {/* ✅ Link to View Invoices */}
                        <Link to="/add-invoice" className="btn">Create Invoice</Link> {/* ✅ Link to Create Invoice */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;
