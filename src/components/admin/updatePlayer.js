import React from "react";

function UpdatePlayer({updatedPlayer, handleUpdate, handleUpdateChange, handleUpdateFileChange, closeUpdate}){

    return(
        <div className="updating-div">
            <input onChange={handleUpdateChange} name="firstName" value={updatedPlayer.firstName} placeholder="First name" />
            <input onChange={handleUpdateChange} name="lastName" value={updatedPlayer.lastName} placeholder="Last name" />
            <input onChange={handleUpdateChange} name="position" value={updatedPlayer.position} placeholder="Position" />
            <input onChange={handleUpdateChange} name="nationality" value={updatedPlayer.nationality} placeholder="Nationality" />
            <input onChange={handleUpdateChange} name="club" value={updatedPlayer.club} placeholder="Club" />
            <input onChange={handleUpdateFileChange} type='file' name='image' id='image'/>
            <button className="update-player-btn" onClick={() => handleUpdate(updatedPlayer._id)}>Update player</button>
            <button className="delete-player-btn" onClick={closeUpdate}>Cancel</button>
        </div>
    )
}

export default UpdatePlayer;