// C:\Users\sjsak\Desktop\Coding\StockTradingPlatform\frontend\src\landing_page\support\FaqItem.js

import React from 'react';

function FaqItem({ question, answer, index, openFaq, setOpenFaq }) {
    // Check if this specific item is the one that's open
    const isOpen = (index === openFaq);

    const toggleFaq = () => {
        // Set this item's index as open, or set to null (close) if it's already open
        setOpenFaq(isOpen ? null : index);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleFaq}>
                <h3>{question}</h3>
                {/* Change the icon based on the state */}
                <i className={isOpen ? "fa-solid fa-minus" : "fa-solid fa-plus"}></i>
            </div>
            
            {/* Conditionally render the answer only if it's open */}
            {isOpen && (
                <div className="faq-answer">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default FaqItem;