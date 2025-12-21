import { Route, Routes } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Main from "./pages/main/Main";
import Checkout from "./pages/checkout/Checkout";
import FoodDetails from "./pages/Food/FoodDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/foodDetails" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
