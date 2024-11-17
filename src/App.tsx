import "./App.css";
import LoginForm from "./components/LoginForm";
import TillCounter from "./components/TillCounter";
import { useState, useEffect } from "react";
import { User } from "./types";
import { createContext } from "react";
import { UserContextType } from "./types";
import tillService from "./service/tills";
import { PopulatedTill } from "./types";
import { TillContextType } from "./types";
import { Toaster } from "sonner";

export const UserContext = createContext<UserContextType | null>(null);

export const TillContext = createContext<TillContextType | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tills, setTills] = useState<PopulatedTill[]>([]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);

      tillService.setToken(user.token);

      setUser(user);
    }
  }, []);

  useEffect(() => {
    tillService.getAll(user?.username).then((data) => setTills(data));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TillContext.Provider value={{ tills, setTills }}>
        <LoginForm />
        <TillCounter />
        <Toaster />
      </TillContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
