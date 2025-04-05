// import React, { useEffect, useState } from "react";
// import { getPatients, deletePatient } from "../services/PatientService";
// import { useNavigate } from "react-router-dom";
// import "./PatientList.css";

// const PatientList = () => {
//     const [patients, setPatients] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchPatients();
//     }, []);

//     const fetchPatients = async () => {
//         try {
//             const data = await getPatients();
//             setPatients(data);
//         } catch (err) {
//             console.error("Error fetching patients:", err);
//             setError("Failed to load patients.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this patient?")) {
//             try {
//                 await deletePatient(id);
//                 setPatients((prev) => prev.filter((patient) => patient.id !== id));
//             } catch (err) {
//                 console.error("Error deleting patient:", err);
//                 alert("Failed to delete patient.");
//             }
//         }
//     };

//     return (
//         <div className="list-container mx-auto p-6">
//             <h2 className="text-3xl font-bold mb-4">Patient List</h2>
//             {/* <button className="add-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4" onClick={() => navigate("/add-patient")}>
//                 Add New Patient
//             </button> */}
            
//             {loading ? (
//                 <div className="text-center">Loading patients...</div>
//             ) : error ? (
//                 <div className="text-red-500">{error}</div>
//             ) : (
//                 <table className="patient-table w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Address</th><th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {patients.map((patient) => (
//                             <tr key={patient.id}>
//                                 <td>{patient.id}</td><td>{patient.firstName}</td><td>{patient.lastName}</td><td>{patient.email}</td><td>{patient.phone}</td><td>{patient.age}</td><td>{patient.address}</td>
//                                 <td>
//                                     <button className="edit-button bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-1" onClick={() => navigate(`/edit-patient/${patient.id}`)}>Edit</button>
//                                     <button className="delete-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(patient.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default PatientList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientList.css";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");  
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const getAuthHeaders = () => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            const { token } = JSON.parse(authData);  // Assuming token is saved as 'token'
            return {
                Authorization: `Bearer ${token}`,
            };
        }
        return {};
    };

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/patients", {
                method: "GET",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                throw new Error("No authentication found. Please log in.");
            }

            const data = await response.json();
            setPatients(data);
        } catch (err) {
            console.error("Error fetching patients:", err);
            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-patient/${id}`);
    };

    const filteredPatients = patients.filter((patient) =>
        patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery)
    );

    return (
        <div className="list-container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Patient List</h2>

            <input
                type="text"
                placeholder="Search by Name, Email, or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            {loading ? (
                <div className="text-center">Loading patients...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <table className="patient-table w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.firstName}</td>
                                    <td>{patient.lastName}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.address}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(patient.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No matching patients found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientList;
