import { useEffect } from "react";
import { useState } from "react";
import shield from "../../icons/shield.svg"
import bolt from "../../icons/bolt.svg"
import heartBreak from "../../icons/heartBreak.svg"
import { Navigate } from "react-router-dom";

function YourBotArmy(){
    const [bots, setBots] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/bots")
            .then(res => res.json())
            .then(data => setBots(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [])
    const handleBack=()=>{
        Navigate('/')
    }

    return(
        <>
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
        </>
    )
}
export default YourBotArmy