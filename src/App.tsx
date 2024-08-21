import "./App.css";
import LoginForm from "./components/LoginForm";
import TillCounter from "./components/TillCounter";
import { useState, useEffect } from "react";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <LoginForm user={user} setUser={setUser} />
      <TillCounter user={user} setUser={setUser} />
    </>
  );
}

export default App;
