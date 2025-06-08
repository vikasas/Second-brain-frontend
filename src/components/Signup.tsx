import { useRef, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const emailref = useRef<HTMLInputElement>(null);
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function submit() {
    const email = emailref.current?.value;
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
        email,
        username,
        password,
      });
      setErrors({});
      navigate("/signin");
      toast.success("Signed up successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const fieldrecord: Record<string, string[]> = {};
          err.response.data.errors.forEach((e: { path: string[]; message: string }) => {
            const field = e.path[0];
            if (!fieldrecord[field]) {
              fieldrecord[field] = [];
            }
            fieldrecord[field].push(e.message);
          });
          setErrors(fieldrecord);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unknown error occurred.");
      }
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center px-4">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
        <h4 className="font-bold text-4xl lg:text-6xl text-primary text-center lg:text-left">
          Welcome to Second Brain...
        </h4>
        <p className="font-normal text-base lg:text-xl mt-2 text-black dark:text-white text-center lg:text-left">
          Save notes, links, and tasks in one place
        </p>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-sm bg-white dark:bg-bggg rounded-md shadow-md border border-slate-300 dark:border-bord p-6">
        <div className="text-center mb-6">
          <h3 className="text-black dark:text-white text-2xl font-semibold">Sign Up</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Input ref={emailref} type="text" placeholder="Email" />
            {errors.email?.map((msg, id) => (
              <p key={id} className="text-red-600 text-xs">{msg}</p>
            ))}
          </div>

          <div>
            <Input ref={usernameref} type="text" placeholder="Username" />
            {errors.username?.map((msg, id) => (
              <p key={id} className="text-red-600 text-xs">{msg}</p>
            ))}
          </div>

          <div>
            <Input ref={passwordref} type="password" placeholder="Password" />
            {errors.password?.map((msg, id) => (
              <p key={id} className="text-red-600 text-xs">{msg}</p>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={submit} variants="primary" size="fl" text="Sign Up" />
        </div>

        <div className="mt-4  space-y-2">
          <p className="text-black dark:text-smalltext font-medium text-xs">Already signed up?</p>
          <Button
            onClick={() => navigate("/signin")}
            variants="secondary"
            size="fl"
            text="Log in"
          />
        </div>
      </div>
    </div>
  );
}
