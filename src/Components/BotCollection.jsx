import { useEffect } from "react"
import { useState } from "react"

function BotCollection(){
    const[bots,setBots]=useState([])
    useEffect(()=> {
        fetch("http://localhost:5000/bots")
        .then(res => res.json())
        .then(data => setBots(data))
    },[])
    console.log(bots)
    return(
     <div className="cards-container">
        {bots.map(bot => (
            <div className="card" key={bot.id}>
              <img src={bot.avatar_url} alt="Avatar" />
                <div className="card-details">
                  <p>Name:{bot.name}</p>
                  <p>Health:{bot.health}</p>
                  <p>Damage:{bot.damage}</p>
                  <p>Armor:{bot.armor}</p>
                  <p>Catchphrase:{bot.catchphrase}</p>
                  <p>Created At:{bot.created_at}</p>
                  <p>Update At:{bot.updated_at}</p>
                </div>
            </div>
        ))}
     </div>
    )
}
export default BotCollection