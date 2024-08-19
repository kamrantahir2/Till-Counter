import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import loginService from "../service/login";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await loginService.login({ username, password });

    console.log(result);
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
