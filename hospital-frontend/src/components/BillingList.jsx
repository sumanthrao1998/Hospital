import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import "./BillingList.css";

const BillingList = () => {
    const [billingData, setBillingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/billing");
                setBillingData(response.data);
            } catch (error) {
                console.error("Error fetching billing data:", error);
            }
        };
        fetchData();
    }, []);

    // ✅ Function to Generate Realistic PDF Invoice
    const generateInvoicePDF = (invoice) => {
        const doc = new jsPDF();

        // // ✅ Add Hospital Logo (Optional: Replace with your own image)
        // const logoUrl = "/hospital_logo.png"; // Place your logo in the public folder

        // const imgWidth = 50; 
        // const imgHeight = 20; 
        // doc.addImage(logoUrl, "PNG", 20, 10, imgWidth, imgHeight);

        // ✅ Hospital Info
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Hospital Management System", 80, 25);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("care Health ameerpet, hyd, india", 80, 35);
        doc.text("Phone: +1 (800) 123-4567", 80, 45);
        doc.text("Email: carehealth@hospital.com", 80, 55);

        // ✅ Invoice Header
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Invoice ID: ${invoice.id}`, 20, 70);
        doc.text(`Date: ${new Date(invoice.billingDate).toLocaleDateString()}`, 140, 70);

        // ✅ Patient Information
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Patient Information", 20, 85);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Patient Name: ${invoice.patientName}`, 20, 95);
        doc.text(`Payment Status: ${invoice.paymentStatus}`, 20, 105);

        // ✅ Billing Summary Table
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Billing Summary", 20, 120);

        doc.autoTable({
            startY: 130,
            head: [["Service", "Quantity", "Price", "Total"]],
            body: [
                ["General Checkup", "1", "₹1000", "₹1000"],
                ["Lab Test", "2", "₹500", "₹1000"],
                ["Medication", "1", "₹1000", "₹1000"],
            ],
            theme: "striped",
            headStyles: { fillColor: [52, 152, 219] }, // Blue header
            bodyStyles: { fontSize: 12 },
            styles: { cellPadding: 5, fontSize: 10, overflow: "linebreak" },
        });

        // ✅ Footer with Total Amount
        const finalY = doc.autoTable.previous.finalY + 10;
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Amount: ₹${invoice.totalAmount.toFixed(2)}`, 20, finalY + 10);

        // ✅ Footer with Hospital Contact Info
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Thank you for your business!", 20, finalY + 30);
        doc.text("For any queries, contact us at +1 (800) 123-4567", 20, finalY + 40);

        // ✅ Save the PDF
        doc.save(`Invoice_${invoice.id}.pdf`);
    };

    return (
        <div className="container">
            <h2>Billing List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {billingData.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.patientName}</td>
                            <td>{new Date(invoice.billingDate).toLocaleDateString()}</td>
                            <td>₹{invoice.totalAmount.toFixed(2)}</td>
                            <td>{invoice.paymentStatus}</td>
                            <td>
                                <button onClick={() => generateInvoicePDF(invoice)} style={{ margin: "5px" }}>
                                    Download Invoice PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillingList;
