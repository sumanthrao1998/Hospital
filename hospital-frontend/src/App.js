// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import MedicalRecordsList from './components/MedicalRecordsList';
// import AddMedicalRecord from './components/AddMedicalRecord';
// import PatientList from './components/PatientList';
// import AddPatient from './components/AddPatientForm';
// import EditPatient from './components/EditPatientForm';
// import DoctorList from './components/DoctorList';
// import AddDoctor from './components/AddDoctor';
// import EditDoctor from './components/EditDoctor';
// import AppointmentList from './components/AppointmentList';
// import AppointmentForm from './components/AppointmentForm';
// import BillingList from "./components/BillingList";
// import BillingForm from "./components/BillingForm";

// const App = () => {
//     return (
//         <Router>
//             <div>
//                 {/* ✅ Navigation Links */}
//                 <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
//                     <Link to="/" style={{ margin: '10px' }}>Home</Link>
//                     <Link to="/patients" style={{ margin: '10px' }}>Patients</Link>
//                     <Link to="/doctors" style={{ margin: '10px' }}>Doctors</Link>
//                     <Link to="/appointments" style={{ margin: '10px' }}>Appointments</Link>
//                     <Link to="/add-appointment" style={{ margin: '10px' }}>Book Appointment</Link>
//                     <Link to="/billings" style={{ margin: '10px' }}>Billing</Link>
//                 </nav>

//                 {/* ✅ Routes */}
//                 <Routes>
//                     {/* ✅ Home Page */}
//                     <Route path="/" element={<HomePage />} />

//                     {/* ✅ Patient Module */}
//                     <Route path="/patients" element={<PatientList />} />
//                     <Route path="/add-patient" element={<AddPatient />} />
//                     <Route path="/edit-patient/:id" element={<EditPatient />} />

//                     {/* ✅ Medical Records Module */}
//                     <Route path="/medical-records" element={<MedicalRecordsList />} />
//                     <Route path="/add-record" element={<AddMedicalRecord />} />

//                     {/* ✅ Doctor Module */}
//                     <Route path="/doctors" element={<DoctorList />} />
//                     <Route path="/add-doctor" element={<AddDoctor />} />
//                     <Route path="/edit-doctor/:id" element={<EditDoctor />} />

//                     {/* ✅ Appointment Booking Module */}
//                     <Route path="/appointments" element={<AppointmentList />} />
//                     <Route path="/add-appointment" element={<AppointmentForm />} />

//                     {/* ✅ Billing Module */}
//                     <Route path="/billings" element={<BillingList />} />        {/* ✅ View Invoices */}
//                     <Route path="/add-invoice" element={<BillingForm />} />      {/* ✅ Create Invoice */}
//                     <Route path="/edit-invoice/:id" element={<BillingForm />} /> {/* ✅ Edit Invoice */}
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import MedicalRecordsList from './components/MedicalRecordsList';
import AddMedicalRecord from './components/AddMedicalRecord';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatientForm';
import EditPatient from './components/EditPatientForm';
import DoctorList from './components/DoctorList';
import AddDoctor from './components/AddDoctor';
import EditDoctor from './components/EditDoctor';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import BillingList from "./components/BillingList";
import BillingForm from "./components/BillingForm";
import Login from './components/Login';  // Import login component

const App = () => {
    return (
        <Router>
            <div>
                {/* ✅ Navigation Links */}
                <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <Link to="/" style={{ margin: '10px' }}>Home</Link>
                    <Link to="/patients" style={{ margin: '10px' }}>Patients</Link>
                    <Link to="/doctors" style={{ margin: '10px' }}>Doctors</Link>
                    <Link to="/appointments" style={{ margin: '10px' }}>Appointments</Link>
                    <Link to="/add-appointment" style={{ margin: '10px' }}>Book Appointment</Link>
                    <Link to="/billings" style={{ margin: '10px' }}>Billing</Link>
                    <Link to="/login" style={{ margin: '10px' }}>Login</Link>
                </nav>

                {/* ✅ Routes */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} /> {/* Add login route */}
                    <Route path="/login" element={<Login />} /> {/* Login Route */}

                    {/* Patient Module */}
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/add-patient" element={<AddPatient />} />
                    <Route path="/edit-patient/:id" element={<EditPatient />} />

                    {/* Other Routes */}
                    <Route path="/medical-records" element={<MedicalRecordsList />} />
                    <Route path="/add-record" element={<AddMedicalRecord />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/edit-doctor/:id" element={<EditDoctor />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/add-appointment" element={<AppointmentForm />} />
                    <Route path="/billings" element={<BillingList />} />
                    <Route path="/add-invoice" element={<BillingForm />} />
                    <Route path="/edit-invoice/:id" element={<BillingForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

