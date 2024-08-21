import "./App.css";
import LoginForm from "./components/LoginForm";
import TillCounter from "./components/TillCounter";
import { useState, useEffect } from "react";
import { User } from "./types";
import { createContext } from "react";
import { UserContextType } from "./types";

export const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoginForm />
      <TillCounter user={user} setUser={setUser} />
    </UserContext.Provider>
  );
}

export default App;
