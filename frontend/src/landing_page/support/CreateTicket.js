// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\support\CreateTicket.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

function CreateTicket() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // 1. Add state for email
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleError = (err) => toast.error(err, { position: "bottom-left" });
    const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 2. Add email to the check
        if (!subject || !description || !email) {
            return handleError("Please fill in all fields.");
        }
        
        try {
            const { data } = await axios.post(
                "http://localhost:3002/api/tickets/create",
                { email, subject, description }, // 3. Send the email in the request
                { withCredentials: true } // This can stay, it doesn't hurt
            );

            if (data.success) {
                handleSuccess("Ticket submitted! We will get back to you soon.");
                setTimeout(() => {
                    navigate('/support'); // Go back to the support page
                }, 2000);
            } else {
                handleError(data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Ticket submission failed:", error);
            handleError("Server error. Please try again.");
        }
    };

    return (
        <div className="form_container">
            <h2>Create a Ticket</h2>
            <p>We'll get back to you by email as soon as possible.</p>
            <form onSubmit={handleSubmit}>
                {/* 4. Add the Email input field to the form */}
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="e.g., you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={subject}
                        placeholder="e.g., Issue with fund withdrawal"
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows="6"
                        value={description}
                        placeholder="Please describe your issue in detail..."
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Submit Ticket</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateTicket;