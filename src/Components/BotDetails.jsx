import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shield from "../../icons/shield.svg";
import bolt from "../../icons/bolt.svg";
import heartBreak from "../../icons/heartBreak.svg";


function BotDetails() {
  const [bots, setBots] = useState([]) // initializes state as empty array
  const { id } = useParams() //allows access of parameters from URL
  const navigate = useNavigate() //for navigation
  const[myArmy,setMyArmy]=useState([]) 

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
    if (bots && bots.length > 0) {
      const newBot = bots[0];
      const isAlreadyEnlisted = myArmy.some(bot => bot.bot_class === newBot.bot_class);
      if (!isAlreadyEnlisted) {
        setBots([])
        setMyArmy(prevArmy => [...prevArmy, newBot]);
      } else {
        alert('You can only add one bot per class to your army.');
      }
    }
  }
  
  const handleDelete = (botId) => {
    fetch(`http://localhost:5000/bots ${botId}`, {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({}),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete bot: ${response.status} - ${response.statusText}`);
      }
      return response.json(); // Assuming your API returns JSON data
    })
    .then(() => {
      setBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));
    })
    .catch((error) => {
      console.error('Error deleting bot:', error.message);
      // Display a user-friendly error message or handle the error appropriately
    });
  };


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
                 <img src={bolt} alt="Bolt" />: {bot.health}
                 <img src={heartBreak} alt="Heart Break" />: {bot.damage}
                 <img src={shield} alt="Shield" />: {bot.armor}
               </div>
             </div>
             <button onClick={handleBack}>Back</button>
             <button onClick={handleEnlistChange}>Enlist</button>
             <button onClick={handleDelete}>X</button>
           </div>
        ))}
    </div>
  );
}

export default BotDetails;
