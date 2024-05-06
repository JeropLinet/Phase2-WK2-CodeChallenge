import { Routes , Route} from 'react-router-dom'
import './App.css'
import BotCollection from './Components/BotCollection'
import BotSpecs from './Components/BotSpecs'
import { useEffect, useState } from 'react'
import YourBotArmy from './Components/YourBotArmy'

function App() {
  const [bot,setBot] = useState([])

   useEffect(() => {
    fetch("http://localhost:5000/bots")
      .then(res => res.json())
      .then(data => setBot(data))
      .catch(error => console.error('Error fetching data:', error));
   }, []);

  const handleDelete = (botId) => {
    fetch(`http://localhost:5000/bots/${botId}`, {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({}),
       })
    .then(()=>{
    setBot(bot.filter(bot => bot.id !== botId))
       })
    .catch(error => console.error('Error in deleting bot', error))
      };
  const handleEnlist = (botId) => {
   selectedId(botId)
  };
  
  return (
    <div className='page-content'>
    <Routes>
      <Route path='/' element={<BotCollection />} />
      <Route path='/bot/:id' element={<BotSpecs bots={bot} onDelete={handleDelete} onEnlist={handleEnlist}/>} />
      <Route path='/myarmy' element={<YourBotArmy/>}></Route>
    </Routes>
    </div>
  )
}

export default App
