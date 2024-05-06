import { useNavigate } from "react-router-dom";

function YourBotArmy(){
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/')
     }
 
    return(
       <>
       <div className="bot-army">
        <h1>My Bot Army</h1>
        <button onClick={handleBack}>Back</button>
       </div>
       </>
    )
}
export default YourBotArmy