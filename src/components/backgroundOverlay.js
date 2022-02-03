import React from 'react';
import BackgroundPic from '../assets/d5740b73.png';

function BackgroundOverlay(){

    return(
        <div className='background-pic' style={{backgroundImage: 'url('+BackgroundPic+')'}} />
    )
}

export default BackgroundOverlay;