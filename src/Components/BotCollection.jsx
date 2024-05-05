import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shield from "../../icons/shield.svg";
import bolt from "../../icons/bolt.svg";
import heartBreak from "../../icons/heartBreak.svg";
import SortBar from "./SortBar";

function BotCollection({onDelete}) {
  const [bots, setBots] = useState([]);
  const [filterClass, setFilterClass] = useState('');
  const [sortOption, setSortOption] = useState('health')
  // Fetching bot data from the db.json
  useEffect(() => {
    fetch("http://localhost:5000/bots")
      .then(res => res.json())
      .then(data => setBots(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function that handles filter change
  const handleFilterChange = e => {
    setFilterClass(e.target.value);
  }
   // Function that handles sort change
   const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Get unique bot classes that helps you to filter
  const presentClasses = [...new Set(bots.map(bot => bot.bot_class))];

  // Filter bots based on the selected class
  // sort bots according to their state
  const filteredBots = bots
    .filter((bot) => filterClass === ''  || bot.bot_class === filterClass) //if class is not defined then no filtering is applied
    .sort((a, b) => {
      if (sortOption === 'health') { 
        return b.health - a.health; //arranges in descending order
      } else if (sortOption === 'damage') {
        return b.damage - a.damage;
      } else if (sortOption === 'armor') {
        return b.armor - a.armor;
      }
      return 0 //if its not one of the options that get sorted..no sorting is applied
    })
    //function to handle delete from the DOM 
    const handleDelete=(botID)=>{
     const updateCollection = bots.filter((bot) => bot.id !== botID)
     setBots(updateCollection)
     onDelete(bolt)
     }
   
  return (
   <>
    <div className="page-content">
       
      <div className="select">
        <button><Link to='/myarmy'>My Army</Link></button>
         <div className="sort-select">
          <SortBar  handleSortChange={handleSortChange} />
         </div>
        <div className="filter-select">
         <select value={filterClass} onChange={handleFilterChange}>
          <option value="">All Classes</option>
         {presentClasses.map((classValue, index) => (
          <option key={index} value={classValue}>
            {classValue}
          </option>
        
          ))}
         </select>
        </div>
      </div>
   
      <div className="cards-container">
        {filteredBots.map(bot => (
          <div className="card">
             <Link to={`/bot/${bot.id}`} key={bot.id}>
                <img src={bot.avatar_url} alt="Avatar" />
             </Link>
              <div className="card-details">
                <p>Name: {bot.name}</p>
                <p>Catchphrase: {bot.catchphrase}</p>
                <p>Occupation: {bot.bot_class}</p>
                <div className="status">
                <span className="icon" role="img" aria-label="Bolt">⚡️</span> : {bot.health} <br/>
                <span className="icon" role="img" aria-label="Heart Break">💔</span> : {bot.damage} <br/>
                <span className="icon" role="img" aria-label="Shield">🛡️</span> : {bot.armor} <br/>

                  
                  <button onClick={()=> {handleDelete(bot.id)}}>Delete</button>
                </div>
              </div>
           </div>
          
        ))}
      </div>

    </div>
   </>
  );
}

export default BotCollection;
