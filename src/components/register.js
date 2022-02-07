import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import IconBox from './iconBox';
import BackgroundOverlay from './backgroundOverlay';

function Register(){

    const navigate = useNavigate();

    const [error, setError] = useState();

    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        userRole: 'User',
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

    async function HandleRegister(e){
        e.preventDefault();

        if(user.username === ''){
            setError('Username is required');
        }
        else if(user.password === ''){
            setError('Password is required');
        }
        else if(user.email === ''){
            setError('Email is required');
        }
        else{
         
            const result = await fetch('https://mern-stack-tonid.herokuapp.com/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })

            const data = await result.json();

            if(data.status === 'ok'){
                navigate('/login');
            }
            else{
                setError(data.error._message);
                console.log(data.error);
            }

        }

    }

    return(
        <section className='landing-page-section'>
            <BackgroundOverlay />
            <IconBox />
            <h2 className='main-heading' >Register for free now!</h2>
            <form onSubmit={HandleRegister} className='user-form'>
                <input onChange={HandleChange} type='text' name='username' value={user.username} placeholder='Username' />
                <input onChange={HandleChange} type='password' name='password' value={user.password} placeholder='Password' />
                <input onChange={HandleChange} type='email' name='email' value={user.email} placeholder='Email' />
                <button type='submit' className='landing-button' >Register</button>
            </form>
            <h2>{error}</h2>
        </section>
    )

}

export default Register;