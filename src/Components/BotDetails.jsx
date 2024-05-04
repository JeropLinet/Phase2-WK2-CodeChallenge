import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shield from "../../icons/shield.svg";
import bolt from "../../icons/bolt.svg";
import heartBreak from "../../icons/heartBreak.svg";


function BotDetails() {
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
//this function hepls th back button to return to the blog collections page
  const handleBack = () => {
    navigate('/')
  }

return (
    <div className="army-container">
        {bots.map(bot => (
             <div className="card-army" key={bot.id}>
             <img src={bot.avatar_url} alt="Avatar" />
             <div className="army_details">
               <p>Name: {bot.name}</p>
               <p>Catchphrase: {bot.catchphrase}</p>
   
               <div className="status">
                 <img src={bolt} alt="Bolt" />: {bot.health}
                 <img src={heartBreak} alt="Heart Break" />: {bot.damage}
                 <img src={shield} alt="Shield" />: {bot.armor}
               </div>
             </div>
             <button onClick={handleBack}>Back</button>
             <button>Enlist</button>
           </div>
        ))}
    </div>
  );
}

export default BotDetails;
