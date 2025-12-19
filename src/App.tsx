import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/main/Main'
import { FoodDetails } from './pages/FoodDetails'
import ProductDetails from './pages/product/Productdetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sobre" element={<FoodDetails />} />
      <Route path="/productDetails" element={<ProductDetails />} />
    </Routes>
  )
}

export default App