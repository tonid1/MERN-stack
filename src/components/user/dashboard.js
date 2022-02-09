import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Login from '../login';
import UpdatePlayer from '../admin/updatePlayer';
import UserHeader from './header';
import BackgroundOverlay from '../backgroundOverlay';

function Dashboard(){

    const navigate = useNavigate();

    const [render,setRender] = useState(false);
    
    const [currentUser, setCurrentUser] = useState({
        id: '',
        username: '',
        userRole: ''
    });
  
    const[players, setPlayers] = useState([{
        firstName: '',
        lastName: '',
        position: '',
        nationality: '',
        club: '',
        _id: ''
    }])

    async function populatePlayers(){
        await fetch('https://mern-stack-tonid.herokuapp.com/players').then(res => {
        if(res.ok){
            return res.json();
        }
        }).then(jsonRes => setPlayers(jsonRes))
        .catch(err => console.log(err))
    }

    

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
                populatePlayers();
            }
        }
        
    }, [render]);


    // MY LIST MANIPULATION

    async function addPlayer(id){

      await axios.put('https://mern-stack-tonid.herokuapp.com/own/' + id, {userId: currentUser.id});  

      setRender(!render);

    }

    // UPDATING PLAYER

    const[updatedPlayer, setUpdatedPlayer] = useState({
        _id: ''
    })

    const [updatedImage, setUpdatedImage] = useState();

    function openUpdate(id){
        setUpdatedPlayer(prev => {
        return({
            ...prev,
            _id: id
        })
        })
    }

    function closeUpdate(){
        setUpdatedPlayer({
                _id: ''
            })
    }

    function handleUpdateChange(event){
        const { name, value } = event.target;
        setUpdatedPlayer(prev => {
        return({
            ...prev,
            [name]: value
        })
        })
    }

    function handleUpdateFileChange(event){
        setUpdatedImage(event.target.files[0]);

        setUpdatedPlayer(prev => {
            return({
                ...prev,
                image: updatedImage
            })
            })
    }

    async function handleUpdate(id){
        await axios.put('https://mern-stack-tonid.herokuapp.com/put/' + id, updatedPlayer);

        closeUpdate();

        setRender(!render);
    }

    function deleteItem(id){
       axios.delete('https://mern-stack-tonid.herokuapp.com/delete/'+id);

       setRender(!render);
    }
    
    return(
        <section>
            {localStorage.length < 1 ? 
                <Login /> 
                :
                <div>
                    <UserHeader />
                    <BackgroundOverlay />
                    <div className="dashboard-outter">
                        {players.map((player, i) => {
                            return(
                            <div key={i} className={updatedPlayer._id === player._id ? 'player-outter-updating' : 'player-outter'}>
                                <img src={player.image} alt={player.lastName} className='player-image'/>
                                <h2>{player.firstName} {player.lastName}</h2>
                                {updatedPlayer._id === player._id ? 
                                currentUser.userRole === 'Admin' && <UpdatePlayer updatedPlayer={updatedPlayer} handleUpdate={handleUpdate} handleUpdateChange={handleUpdateChange} handleUpdateFileChange={handleUpdateFileChange} closeUpdate={closeUpdate} />
                                : <div className='update-delete-div'>
                                    {player.userId ? 
                                        <button disabled className='add-player-btn'>+</button> 
                                        : 
                                        <button onClick={() => addPlayer(player._id)} className='add-player-btn'>+</button>
                                    }   
                                    {currentUser.userRole === 'Admin' && 
                                        <div>
                                        <button onClick={() => openUpdate(player._id)} className='update-player-btn'>Update</button>
                                        <button onClick={() => deleteItem(player._id)} className='delete-player-btn'>Delete</button>
                                        </div>
                                    }                                 
                                </div> }
                            </div>
                            )
                        })}
                    </div>
                </div>
            }
        </section>
    )
}

export default Dashboard;