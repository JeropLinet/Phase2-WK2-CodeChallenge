
import { useEffect } from "react"
import { useState } from "react"
import shield from "../../icons/shield.svg"
import bolt from "../../icons/bolt.svg"
import heartBreak from "../../icons/heartBreak.svg"

function BotCollection() {
    const [bots, setBots] = useState([])
    const [filterClass, setFilterClass] = useState("")
//handles when the input value changes
    const handleFilterChange = (e) => {
        setFilterClass(e.target.value)
    };
//Fetching of the bot data from my db.json
    useEffect(() => {
        fetch("http://localhost:5000/bots")
            .then(res => res.json())
            .then(data => setBots(data))
            .catch(error => console.error('Error fetching data:', error))
    }, []);
//this function shows all the present classes
    const presentClasses = [...new Set(bots.map(bot => bot.bot_class))]
    
//function to filter the bot classes
//the first (filterClass === "") shows all the bots if a class is not selected
//the second one shows the bots based on the class chosen
    const filteredBots = bots.filter(bot =>
        filterClass === "" || bot.bot_class === filterClass
    );

    return (
        <>
            <select
                value={filterClass}
                onChange={handleFilterChange}
            >
                <option value="">All Classes</option>
                {presentClasses.map((classValue, index) => (
                    <option key={index} value={classValue}>{classValue}</option>
                ))}
            </select>
            <div className="cards-container">
                {filteredBots.map(bot => (
                    <div className="card" key={bot.id}>
                        <img src={bot.avatar_url} alt="Avatar" />
                        <div className="card-details">
                            <p>Name: {bot.name}</p>
                            <p>Catchphrase: {bot.catchphrase}</p>
                            <p>Created At: {bot.created_at}</p>
                            <p>Update At: {bot.updated_at}</p>
                            <p>Bot Class: {bot.bot_class}</p>
                            <div className="status">
                                <img src={bolt} alt="Bolt" />: {bot.health}
                                <img src={heartBreak} alt="Heart Break" />: {bot.damage}
                                <img src={shield} alt="Shield" />: {bot.armor}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BotCollection;
