import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./assets/pages/Auth.jsx";
import Checkout from "./assets/pages/Checkout.jsx";
import Home from "./assets/pages/Home.jsx";
import Navbar from "./assets/components/Navbar.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
