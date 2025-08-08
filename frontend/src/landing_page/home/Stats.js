import React from 'react';
import './Stats.css';

function Stats() {
    return ( 
        <div className='container'>
            <div className="stats row">
                <div className="text-stats col-5">
                    <h2 className='h2-stats'>Trust with confidence</h2>

                    <h5>Customer-first always</h5>
                    <p className='para-stats'>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>

                    <h5>No spam or gimmicks</h5>
                    <p className='para-stats'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.<a href=""> Our philosophies.</a></p>

                    <h5>The Zerodha universe</h5>
                    <p className='para-stats'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>

                    <h5>Do better with money</h5>
                    <p className='para-stats' /*text-muted*/>With initiatives like <a href="">Nudge</a> and <a href="">Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.</p>
                </div>
                <div className="col-7">
                    <img src="Media/ecosystem.png" alt="ecosystem" className='image-stats'/>
                    <div className='explore'>
                        <a href="">Explore our products <i class="fa-solid fa-arrow-right"></i></a>
                        <a href="">Try Kite demo <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
                <img src="Media/pressLogos.png" alt="press" className='press-stats'/>
            </div>
        </div>
     );
}

export default Stats;