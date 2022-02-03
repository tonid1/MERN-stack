import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PlayerIcon from '../../assets/soccer-player.png';
import jwt from "jsonwebtoken";

function UserHeader(){

    const navigate = useNavigate();
        
    const [currentUser, setCurrentUser] = useState({
        id: '',
        username: '',
        userRole: ''
    });

    useEffect(() => {

        const token = localStorage.getItem('token');

        if(token){
            const user = jwt.decode(token);

            if(!user){
                localStorage.removeItem('token');
                navigate('/login', {replace: true});
            }
            else{
                setCurrentUser(user);
            }
        }
        
    }, []);

    function handleLogOut(){
      localStorage.removeItem('token');
      navigate('/', {replace: true});
    }

    return(
        <section className="user-header-section">
            <div className="user-header-outter">
                <div className="user-header-inner">
                    <a href="/dashboard">
                        <img src={PlayerIcon} className='header-icon' alt='icon'/>
                    </a>
                </div>
                <div className="user-header-inner">
                    <h2 onClick={() => navigate('/admin')} className="header-username">{currentUser.username}</h2>
                    <button onClick={handleLogOut} className="header-logout-btn">Log out</button>
                </div>
            </div>
        </section>
    )
}

export default UserHeader;