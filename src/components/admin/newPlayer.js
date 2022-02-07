import React, {useState} from 'react';
import axios from 'axios';

function NewPlayer(){

    const [player, setPlayer] = useState({
        firstName: '',
        lastName: '',
        position: '',
        nationality: '',
        club: ''
      })
    
      const [image,setImage] = useState();

      function handleChange(event){
        const {name, value} = event.target;
        setPlayer((prev) => {
          return{
            ...prev,
            [name]: value,
          }
        })
      }
    
      function handleFileChange(event){
        setImage(event.target.files[0])
      }
    
      function handleSubmit(event){
        event.preventDefault();
    
        const data = new FormData();
    
        data.append('firstName', player.firstName);
        data.append('lastName', player.lastName);
        data.append('position', player.position);
        data.append('nationality', player.nationality);
        data.append('club', player.club);
        if(image){
          data.append('image', image)
        }
    
        axios.post('https://mern-stack-tonid.herokuapp.com/newPlayer', data).then( res => console.log(res));
    
        setPlayer({
          firstName: '',
          lastName: '',
          position: '',
          nationality: '',
          club: ''
        })
    
        setImage(undefined);
      }

      return(
        <div>
            <form className='add-new-form'>
              <input onChange={handleChange} name="firstName" value={player.firstName} placeholder="First name" />
              <input onChange={handleChange} name="lastName" value={player.lastName} placeholder="Last name" />
              <input onChange={handleChange} name="position" value={player.position} placeholder="Position" />
              <input onChange={handleChange} name="nationality" value={player.nationality} placeholder="Nationality" />
              <input onChange={handleChange} name="club" value={player.club} placeholder="Club" />
              <input onChange={handleFileChange} type='file' name='image' id='image'/>
              <button className='update-player-btn' onClick={handleSubmit}>Add Player</button>
            </form>
        </div>
      )

}

export default NewPlayer;