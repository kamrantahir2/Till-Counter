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
import { Routes, Route, Link } from "react-router-dom";

import Table from "./components/Table/page";

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
        <div className="mb-4 flex justify-around bg-black">
          <Link className="text-xl font-medium underline text-blue-500" to="/">
            Tills
          </Link>
          <Link
            to="/table"
            className="text-xl font-medium underline text-blue-500"
          >
            Table
          </Link>
        </div>

        <LoginForm />

        <Routes>
          <Route path="/" element={<TillCounter />} />
          <Route path="/table" element={<Table />} />
        </Routes>
        <Toaster />
      </TillContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
