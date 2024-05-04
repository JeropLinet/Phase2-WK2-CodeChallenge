import { useEffect } from "react";
import { useState } from "react";

function YourBotArmy(){
  const [enlist, setEnlist]=useState('')

  const handleEnlistChange=(e)=> setEnlist(e.target.value())
    return(
       <>
       <div className="bot_army">
        <h1>My Bot Army</h1>
       </div>
       </>
    )
}
export default YourBotArmy;