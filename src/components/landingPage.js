import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconBox from './iconBox.js';
import BackgroundOverlay from './backgroundOverlay.js';

function LandingPage(){

    const navigate = useNavigate();

    return(
        <section className='landing-page-section'>
            <BackgroundOverlay />
            <IconBox />
            <button onClick={() => navigate('/register')} className='landing-button' >Register</button>
            <h4 className='small-text'>Already have an account?</h4>
            <button onClick={() => navigate('/login')} className='landing-button' >Log In</button>
        </section>
    )
}

export default LandingPage;