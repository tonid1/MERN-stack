import React from 'react';
import PlayerIcon from '../assets/soccer-player.png';

function IconBox(){

    return(
        <div className='icon-div'>
            <img src={PlayerIcon} className='landing-icon' alt='icon'/>
            <h2 className='logo-text'>Fantasy<br/>Football</h2>
        </div>
    )
}

export default IconBox;