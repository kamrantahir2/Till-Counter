import { useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-red-400 text-6xl">TESTS</h1>
        <Button className="bg-red-500">Click me</Button>
      </div>
    </>
  );
}

export default App;
