// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\support\SupportPage.js

import React from 'react';
import FaqItem from './FaqItem'; // 2. Import the new component
import { useState } from 'react'; // 3. Import useState
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

function SupportPage(){

    const [openFaq, setOpenFaq] = useState(null);
    const navigate = useNavigate(); // This line needs the import

    // 4. Define your FAQ data in an array
    const faqs = [
        {
            q: "How do I reset my password?",
            a: "You can reset your password by clicking the 'Forgot Password?' link on the Login page. You will receive a token to reset your password."
        },
        {
            q: "How do I add or withdraw funds?",
            a: "Navigate to the 'Funds' tab after logging in. You will see 'Add Funds' and 'Withdraw' buttons. Please note that withdrawals are processed at the end of the business day."
        },
        {
            q: "Why was my buy order rejected?",
            a: "A buy order can be rejected for two main reasons: 1. Insufficient funds in your account. 2. You placed the order outside of market hours (9:15 AM - 3:30 PM)."
        },
        {
            q: "What are the account maintenance charges (AMC)?",
            a: "We are proud to offer a ₹0 AMC (Annual Maintenance Charge) for all our trading accounts. All accounts are free for life."
        }
    ];

    // Handler for the "Create a Ticket" button
    const handleCreateTicket = () => {
        navigate('/create-ticket'); // Navigate to the new page
    };

    return (
        <div className="support-page-container">
            {/* --- 1. Hero Search --- */}
            <div className="support-hero">
                <h1>Support Portal</h1>
                <h2>Search for topics, articles, or keywords</h2>
                <div className="support-search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search for your query..." />
                </div>
            </div>

            {/* --- 2. Topics Grid --- */}
            <div className="support-topics-container">
                <h2>Browse by Topic</h2>
                <div className="support-topics-grid">
                    <div className="support-topic-card">
                        <i className="fa-solid fa-user-circle"></i>
                        <h3>Your Account</h3>
                    </div>
                    <div className="support-topic-card">
                        <i className="fa-solid fa-wallet"></i>
                        <h3>Funds</h3>
                    </div>
                    <div className="support-topic-card">
                        <i className="fa-solid fa-arrow-trend-up"></i>
                        <h3>Trading & Orders</h3>
                    </div>
                    <div className="support-topic-card">
                        <i className="fa-solid fa-laptop"></i>
                        <h3>Platforms</h3>
                    </div>
                </div>
            </div>

            {/* --- 3. NEW: FAQ Section --- */}
            <div className="faq-container">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        index={index}
                        question={faq.q}
                        answer={faq.a}
                        openFaq={openFaq}
                        setOpenFaq={setOpenFaq}
                    />
                ))}
            </div>

            {/* --- 3. Contact Section --- */}
            <div className="support-contact">
                <h2>Contact Us</h2>
                <p>Can't find an answer? We're here to help.</p>
                <button className="btn btn-blue" onClick={handleCreateTicket}>
                    Create a Ticket
                </button>
            </div>
        </div>
    )
}

export default SupportPage;