import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./assets/pages/Auth.jsx";
import Checkout from "./assets/pages/Checkout.jsx";
import Home from "./assets/pages/Home.jsx";
import ProductDetails from "./assets/pages/ProductDetails.jsx";
import Navbar from "./assets/components/Navbar.jsx";
import AuthProvider from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
