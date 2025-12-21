import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main/Main'
import Checkout from './pages/Checkout/Checkout'
import Cart from './pages/Cart/Cart'
import FoodDetails from './pages/Food/FoodDetails'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sobre" element={<FoodDetails />} />
      <Route path="/foodDetails" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default App