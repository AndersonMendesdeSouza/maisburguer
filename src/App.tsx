import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/main/Main'
import { FoodDetails } from './pages/FoodDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sobre" element={<FoodDetails />} />
    </Routes>
  )
}

export default App