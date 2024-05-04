import { Routes , Route} from 'react-router-dom'
import './App.css'
import BotCollection from './Components/BotCollection'
import YourBotArmy from './Components/YourBotArmy'
import BotDetails from './Components/BotDetails'
function App() {
  

  return (
    <>
  
    <Routes>
      <Route path='/' element={<BotCollection/>}/>
      <Route path='/bot Collection' element={<YourBotArmy/>}/>
      <Route path='/bot/:id' element={<BotDetails />} />
    </Routes>
    </>
  )
}

export default App
