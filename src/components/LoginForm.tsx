import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import loginService from "../service/login";
import tillService from "../service/tills";
import { UserContext } from "@/App";
import { useContext } from "react";
import { toast } from "sonner";
import usersService from "../service/users";
import { Credentials } from "@/types";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext cannot be null");
  }

  const login = async (details: Credentials) => {
    try {
      const user = await loginService.login(details);

      tillService.setToken(user.token);

      window.localStorage.setItem("cupLogIn", JSON.stringify(user));

      userContext.setUser(user);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();

      await login({ username, password });

      toast.success("Log In Successful", {
        classNames: {
          toast: " border-2 bg-green-100 border-green-500",
          title: "text-base",
        },
      });
    } catch (error) {
      toast.error("Username or Password Incorrect", {
        classNames: {
          toast: "border-2 bg-red-100 border-red-500 ",
          title: "text-base",
        },
      });
    }
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      await usersService.createUser({ username, password });

      await login({ username, password });
      toast.success("User Created Successfully", {
        classNames: {
          toast: " border-2 border-green-500",
          title: "text-base",
        },
      });
    } catch (error) {
      toast.error("Username Already In Use", {
        classNames: {
          toast: "border-2 border-red-500",
          title: "text-base",
        },
      });
    }
  };

  const handleLogout = () => {
    userContext.setUser(null);
    window.localStorage.removeItem("cupLogIn");
    toast.success("Successfully Logged Out", {
      classNames: {
        toast: " border-2 bg-blue-100 border-blue-500",
        title: "text-base",
      },
    });
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

          <div className="mt-4">
            <Button className="text-md" type="submit">
              Login
            </Button>

            <Button className="text-md mx-2" onClick={handleRegister}>
              Register
            </Button>
          </div>
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
