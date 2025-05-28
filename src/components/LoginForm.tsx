import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import loginService from "../service/login";
import tillService from "../service/tills";
import { UserContext } from "@/App";
import { useContext } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext cannot be null");
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });

    tillService.setToken(user.token);

    window.localStorage.setItem("loggedInUser", JSON.stringify(user));

    userContext.setUser(user);
  };

  const handleLogout = () => {
    userContext.setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  if (!userContext.user) {
    return (
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex">
            <h3 className="leading-10">Username: </h3>
            <Input
              className="w-6/12 md:w-4/12 ml-2"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex">
            <h3 className="leading-10">Password: </h3>
            <Input
              className="w-6/12 md:w-4/12 ml-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          <Button className="text-md" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="p-8">
        <em>{userContext.user.username} logged in</em>
        <Button className="ml-4 text-md" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }
};

export default LoginForm;
