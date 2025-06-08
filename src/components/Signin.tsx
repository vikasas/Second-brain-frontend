import axios from "axios";
import { useRef } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Signin() {
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function submit() {
    const email = emailref.current?.value;
    const password = passwordref.current?.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
        { email, password }
      );

      if (!response || !response.data?.token) {
        toast.error("Please enter correct credentials");
        return;
      }

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      toast.success("Signed in successfully");
      navigate("/home");
    } catch (e) {
      console.log(e);
      toast.error("Sign-in failed");
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm bg-white dark:bg-bggg rounded-md shadow-md border border-slate-300 dark:border-bord px-6 py-8">
        <div className="text-center mb-6">
          <h3 className="text-black dark:text-white text-2xl font-semibold">
            Sign In
          </h3>
        </div>
        <div className="space-y-4">
          <Input ref={emailref} type="text" placeholder="Email" />
          <Input ref={passwordref} type="password" placeholder="Password" />
        </div>
        <div className="mt-6">
          <Button
            onClick={submit}
            variants="primary"
            size="fl"
            text="Log in"
          />
        </div>
      </div>
    </div>
  );
}
