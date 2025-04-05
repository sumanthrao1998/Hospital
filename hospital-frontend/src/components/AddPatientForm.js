// import React, { useState } from 'react';
// import { createPatient } from "../services/PatientService";  
// import { useNavigate } from 'react-router-dom';
// import "./AddPatientForm.css"; // Importing CSS for styling

// const AddPatientForm = () => {
//     const navigate = useNavigate();

//     const [patient, setPatient] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         age: '',
//         gender: '',
//         address: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPatient((prevPatient) => ({
//             ...prevPatient,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await createPatient(patient);
//             alert('Patient added successfully!');
//             navigate('/'); 
//         } catch (error) {
//             console.error('Error adding patient:', error);
//             alert('Failed to add patient. Please try again.');
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2 className="form-title">Add New Patient</h2>
//             <form onSubmit={handleSubmit} className="patient-form">
//                 <div className="form-grid">
//                     <div className="form-group">
//                         <label>First Name:</label>
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={patient.firstName}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Last Name:</label>
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={patient.lastName}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={patient.email}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Phone:</label>
//                         <input
//                             type="text"
//                             name="phone"
//                             value={patient.phone}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Age:</label>
//                         <input
//                             type="number"
//                             name="age"
//                             value={patient.age}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Gender:</label>
//                         <select
//                             name="gender"
//                             value={patient.gender}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                         >
//                             <option value="">Select</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>

//                     <div className="form-group full-width">
//                         <label>Address:</label>
//                         <textarea
//                             name="address"
//                             value={patient.address}
//                             onChange={handleChange}
//                             required
//                             className="form-input textarea"
//                         />
//                     </div>
//                 </div>

//                 <div className="button-container">
//                     <button type="submit" className="submit-button">
//                         Add Patient
//                     </button>
//                     <button type="button" onClick={() => navigate('/')} className="cancel-button">
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
import React, { useState } from "react";
import { createPatient } from "../services/PatientService";
import { useNavigate } from "react-router-dom";
import "./AddPatientForm.css"; 

const AddPatientForm = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(""); // For backend errors

  // Validation function
  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[a-zA-Z]+$/; // Only letters
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation
    const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits

    // Check for empty fields
    for (const field in patient) {
      if (!patient[field].trim()) {
        newErrors[field] = `${field.replace(/^\w/, (c) => c.toUpperCase())} is required`;
      }
    }

    // Specific validations
    if (patient.firstName && !nameRegex.test(patient.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (patient.lastName && !nameRegex.test(patient.lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    if (patient.email && !emailRegex.test(patient.email)) {
      newErrors.email = "Enter a valid email (e.g., example@mail.com)";
    }

    if (patient.phone && !phoneRegex.test(patient.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in First Name and Last Name fields
    if ((name === "firstName" || name === "lastName") && !/^[a-zA-Z]*$/.test(value)) {
      return; // Block numbers and special characters
    }

    // Ensure phone field only accepts digits
    if (name === "phone" && !/^\d*$/.test(value)) {
      return; // Prevent non-numeric input
    }

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        // Send correct data format to the backend
        const payload = {
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          age: patient.age.toString(),      // Ensure age is sent as string
          gender: patient.gender,
          address: patient.address,
        };

        await createPatient(payload);
        alert("Patient added successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error adding patient:", error);

        // Handle backend errors gracefully
        setSubmitError("Failed to add patient. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Patient</h2>
      
      {submitError && <p className="backend-error">{submitError}</p>} {/* Display backend error */}
      
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-grid">
          
          {/* First Name */}
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={patient.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? "error-border" : ""}`}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={patient.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? "error-border" : ""}`}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error-border" : ""}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={patient.phone}
              onChange={handleChange}
              maxLength="10"
              className={`form-input ${errors.phone ? "error-border" : ""}`}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
              className={`form-input ${errors.age ? "error-border" : ""}`}
            />
            {errors.age && <p className="error-text">{errors.age}</p>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              className={`form-input ${errors.gender ? "error-border" : ""}`}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="error-text">{errors.gender}</p>}
          </div>

          {/* Address */}
          <div className="form-group full-width">
            <label>Address:</label>
            <textarea
              name="address"
              value={patient.address}
              onChange={handleChange}
              className={`form-input ${errors.address ? "error-border" : ""}`}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">
            Add Patient
          </button>
          <button type="button" onClick={() => navigate("/")} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;

