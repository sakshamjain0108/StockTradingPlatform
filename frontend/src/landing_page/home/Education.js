import React from 'react';
import './Education.css';

function Education() {
    return (
        <div className='education'>
            <div className="image-education">
                <img src="Media/education.svg" alt="education" />
            </div>
            <div className="text-education">
                <h2 className='h2-education'>Free and open market education</h2>
                <div className="para1-education">
                    <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="">Varsity <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="para2-education">
                    <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="">TradingQ&A <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;