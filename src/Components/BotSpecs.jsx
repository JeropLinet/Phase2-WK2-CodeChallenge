import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shield from "../../icons/shield.svg";
import bolt from "../../icons/bolt.svg";
import heartBreak from "../../icons/heartBreak.svg";
import { Link } from "react-router-dom";


function BotSpecs({onDelete,onEnlist}) {
  const [bots, setBots] = useState([]) // initializes state as empty array
  const { id } = useParams() //allows access of parameters from URL
  const navigate = useNavigate() //for navigation
  
  

  useEffect(() => {
    fetch(`http://localhost:5000/bots/${id}`) //uses id to change urls
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        setBots ([data])})
      .catch(error => console.error('Error fetching bot details:', error));
  }) 
//this function helps the back button to return to the blog collections page
  const handleBack = () => {
    navigate('/')
  }

  const handleEnlistChange=()=>{
    onEnlist(bots.id)
    navigate('/myarmy')
  }
 
  const handleDelete=(botID)=>{
    const updateCollection = bots.filter((bot) => bot.id !== botID)
    setBots(updateCollection)
    onDelete(bolt)
    navigate('/')
    }
 
 

return (
    <div className="army-container">
        {bots.map(bot => (
             <div className="bot-card" key={bot.id}>
             <img src={bot.avatar_url} alt="Avatar"/>
             <div className="bot_details">
               <p>Name: {bot.name}</p>
               <p>Catchphrase: {bot.catchphrase}</p>
               <p>Occupation: {bot.bot_class}</p>
               <div className="status">
               <span className="icon" role="img" aria-label="Bolt">⚡️</span> : {bot.health} <br/>
               <span className="icon" role="img" aria-label="Heart Break">💔</span> : {bot.damage} <br/>
               <span className="icon" role="img" aria-label="Shield">🛡️</span> : {bot.armor} <br/>

               </div>
             </div>
             <button onClick={handleBack}>Back</button>
             <button onClick={handleEnlistChange}> Enlist</button>
             <button onClick={()=> {handleDelete(bot.id)}}>Delete</button>
           </div>
        ))}
    </div>
  );
}

export default BotSpecs;
