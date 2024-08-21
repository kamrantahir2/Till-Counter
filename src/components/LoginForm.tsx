import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import loginService from "../service/login";
import tillService from "../service/tills";
import { User } from "@/types";

const LoginForm = ({ user }: { user: User | null }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });

    tillService.setToken(user.token);

    window.localStorage.setItem("loggedInUser", JSON.stringify(user));

    console.log(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex">
          <h3 className="leading-10">Username: </h3>
          <Input
            className="w-6/12 ml-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 flex">
          <h3 className="leading-10">Password: </h3>
          <Input
            className="w-6/12 ml-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
