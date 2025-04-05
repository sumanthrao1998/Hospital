import React, { useState } from "react";
import "./BillingForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BillingForm = () => {
    const navigate = useNavigate();
    
    const [billingData, setBillingData] = useState({
        patientName: "",
        billingDate: "",
        totalAmount: "",
        paymentStatus: "Pending",
        services: [{ serviceName: "", price: "", quantity: "" }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingData({ ...billingData, [name]: value });
    };

    const handleServiceChange = (index, e) => {
        const { name, value } = e.target;
        const services = [...billingData.services];
        services[index][name] = value;
        setBillingData({ ...billingData, services });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/billing", billingData)
            .then(() => navigate("/invoices"))
            .catch(error => console.error("Error creating invoice:", error));
    };

    return (
        <div className="billing-form-container">
            <h1>Create Invoice</h1>
            <form onSubmit={handleSubmit}>
                <label>Patient Name:</label>
                <input
                    type="text"
                    name="patientName"
                    value={billingData.patientName}
                    onChange={handleChange}
                    required
                />

                <label>Billing Date:</label>
                <input
                    type="date"
                    name="billingDate"
                    value={billingData.billingDate}
                    onChange={handleChange}
                    required
                />

                <label>Total Amount:</label>
                <input
                    type="number"
                    name="totalAmount"
                    value={billingData.totalAmount}
                    onChange={handleChange}
                    required
                />

                <label>Payment Status:</label>
                <select
                    name="paymentStatus"
                    value={billingData.paymentStatus}
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                </select>

                <h3>Services</h3>
                {billingData.services.map((service, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="serviceName"
                            value={service.serviceName}
                            onChange={(e) => handleServiceChange(index, e)}
                            placeholder="Service Name"
                        />
                        <input
                            type="number"
                            name="price"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, e)}
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={service.quantity}
                            onChange={(e) => handleServiceChange(index, e)}
                            placeholder="Quantity"
                        />
                    </div>
                ))}

                <button type="submit">Create Invoice</button>
            </form>
        </div>
    );
};

export default BillingForm;
