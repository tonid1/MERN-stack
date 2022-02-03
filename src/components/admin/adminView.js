import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NewPlayer from './newPlayer';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../user/header';
import BackgroundOverlay from '../backgroundOverlay';

function AdminView(){

  const [adding, setAdding] = useState(false);
  const [render, setRender] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    username: '',
    userRole: ''
  });
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');

    if(token){
        const user = jwt.decode(token);

        if(!user){
            localStorage.removeItem('token');
            navigate('/login', {replace: true});
        }

        setCurrentUser(user);

        fetch('/myplayers/' + user.id).then(res => {
          if(res.ok){
            return res.json();
          }
        }).then(jsonRes => setMyPlayers(jsonRes))
        .catch(err => console.log(err))
    }

    
  
  }, [render]);

  function handleAddNew(){
    setAdding(true);
  }

  function handleRemoval(id){
    axios.put('/own/' + id);

    setRender(!render);
  }

  const [myPlayers, setMyPlayers] = useState([{
    firstName: '',
    lastName: '',
    position: '',
    nationality: '',
    club: '',
    userId: '',
    _id: ''
  }])

  return(
    <section>
      <UserHeader />
      <BackgroundOverlay />
      <div className="dashboard-outter">
        <h2>My players</h2>
        {myPlayers.map((player, i) => {
          return(
            <div className='inner-admin' key={i}>
              <h2>{player.firstName} {player.lastName}</h2>
              <button onClick={() => handleRemoval(player._id)} className='remove-player-btn'>-</button>
            </div>
          )
        })}
        {currentUser.userRole === 'Admin' &&
          <button onClick={handleAddNew} className='add-new-player'>Add new player</button>}
          {adding && <NewPlayer />}
      </div>
    </section>
  )
}

export default AdminView;