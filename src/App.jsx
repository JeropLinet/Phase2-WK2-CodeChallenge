import { Routes , Route} from 'react-router-dom'
import './App.css'
import BotCollection from './Components/BotCollection'
import YourBotArmy from './Components/YourBotArmy'
import BotDetails from './Components/BotDetails'

function App() {
  

  return (
    <div className='page-content'>
     <YourBotArmy/>
    <Routes>
      <Route path='/' element={<BotCollection/>}/>
      <Route path='/yourbotarmy' element={<YourBotArmy />} />
      <Route path='/bot/:id' element={<BotDetails />} />
    </Routes>
    </div>
  )
}

export default App
