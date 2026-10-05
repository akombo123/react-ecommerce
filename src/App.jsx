import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import OptimisticQueryExample from "./assets/components/OptimisticQueryExample";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <OptimisticQueryExample />
    </>
  );
}

export default App;
