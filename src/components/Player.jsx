import { useState } from 'react'

function Player({initialName,symbol ,isActive,onNameChange}){
    const [isEditing,setIsEditing]= useState(false)
    const [playerName,setPlayerName]=useState(initialName)
    

    console.log('onNameChange',onNameChange)
    function handleEditClick(){
        setIsEditing((editing)=>!editing) 

        if (setIsEditing){
            onNameChange(symbol,playerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }


    let editplayerName = <span className = "player-name">{playerName}</span>

    if (isEditing){
        editplayerName= 
        <input type="text"  value={playerName}  onChange={handleChange} required/>
    }
        return (
            
            <li className={isActive?'active':undefined}> 
                <span className="player">
                {editplayerName}
                <span className= "player-symbol">{symbol} </span>
                </span>
                <button onClick={handleEditClick}>{isEditing?'Save':"Edit"}</button>
            </li>
            
        )
    }

export default Player