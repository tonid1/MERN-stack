import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import IconBox from './iconBox';
import BackgroundOverlay from './backgroundOverlay';

function Login(){

    const navigate = useNavigate();

    const [error, setError] = useState({
        status: '',
        user: ''
    });

    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    function HandleChange(event){
        const {name, value} = event.target;

        setUser((prev) => {
            return{
                ...prev,
                [name]: value,
            }
        })
    }

    async function HandleLogin(e){
        e.preventDefault();

        const result = await fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        const data = await result.json();

        if(data.user){
            localStorage.setItem('token', data.user);
            navigate('/dashboard');
        }
        else{
            setError(data);
        }
    }

    return(
        <section className='landing-page-section'>
            <BackgroundOverlay />
            <IconBox />
            <h2 className='main-heading' >Log in to your account</h2>
            <form onSubmit={HandleLogin}  className='user-form'>
                <input onChange={HandleChange} type='text' name='username' value={user.username} placeholder='Username' />
                <input onChange={HandleChange} type='password' name='password' value={user.password} placeholder='Password' />
                <button type='submit' className='landing-button' >Login</button>
            </form>
            <h2>{error.status}</h2>
        </section>
    )

}

export default Login;