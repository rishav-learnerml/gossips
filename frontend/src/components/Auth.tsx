import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { signupInputType } from "@rishav_dev/gossips-types";
import { Button } from "./ui/button";
import axios from "axios";
import { BACKEND_URL, SIGNIN, SIGNUP } from "@/common/config";
import { useToast } from "../hooks/use-toast";

type authType = { type: "signup" | "signin" };

const Auth = ({ type }: authType) => {
  const navgate = useNavigate();
  const { toast } = useToast();
  const [postInputs, setPostInputs] = useState<signupInputType>({
    name: "",
    username: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}${type === "signup" ? SIGNUP : SIGNIN}`,
        postInputs
      );
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      navgate("/blogs");
    } catch (error) {
      console.error("Error sending request: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request!",
      });
    }
  };

  return (
    <div className="h-[55vh] sm:h-screen sm:w-6/12 flex justify-center items-center flex-col">
      <div className="text-3xl font-bold">Create a Gossip Id</div>
      <div className="text-slate-400">
        {type === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          to={type === "signup" ? "/signin" : "/signup"}
          className="underline"
        >
          {type === "signup" ? "Login" : "Signup"}
        </Link>
      </div>
      <div className="my-4">
        {type === "signup" && (
          <LabelInput
            type="text"
            label="Name"
            placeholder="Your Name"
            onChange={(e) => {
              setPostInputs((post) => ({
                ...post,
                name: e.target.value,
              }));
            }}
          />
        )}
        <LabelInput
          type="email"
          label="Username"
          placeholder="Your Email Id"
          onChange={(e) => {
            setPostInputs((post) => ({
              ...post,
              username: e.target.value,
            }));
          }}
        />
        <LabelInput
          type="password"
          label="Password"
          placeholder="Your Password"
          onChange={(e) => {
            setPostInputs((post) => ({
              ...post,
              password: e.target.value,
            }));
          }}
        />
      </div>
      <Button className="my-2 w-5/12" onClick={sendRequest}>
        {type === "signup" ? "Sign Up" : "Sign In"}
      </Button>
    </div>
  );
};

interface labelInputTypes {
  type: "email" | "password" | "text";
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({
  label,
  placeholder,
  onChange,
  type,
}: labelInputTypes) => {
  return (
    <div className="grid w-[20rem] items-center gap-1.5 my-4">
      <Label htmlFor="email">{label}</Label>
      <Input
        type={type}
        id={label}
        placeholder={placeholder}
        onChange={onChange}
        className="border-2 border-gray-400 bg-gray-100"
      />
    </div>
  );
};

export default Auth;
