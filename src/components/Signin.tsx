import axios from "axios";
import { useRef } from "react"

import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function Signin(){
    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function submit(){
        const email = emailref.current?.value;
        const password = passwordref.current?.value;
        try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signin` , {
            email,
            password
        })
        if(!response){
            toast.error("Please enter correct credntials")
        }
        const jwt = response.data.token;
        localStorage.setItem("token" , jwt);
        toast.success("Signed in succesfully")
        navigate("/home")
    }catch(e){
        console.log(e);
        toast.error("Signed in failed")
    }
}
    return(
         <div className="w-screen h-screen flex flex-col space-y-4 justify-center items-center">
                    {/* <h4 className="text-blue-700 dark:text-white font-semibold text-4xl">Second Brain</h4> */}
                    <div className="w-1/4 px-2 pb-8 bg-white flex flex-col justify-start rounded-md dark:bg-bggg shadow-xl/20 border border-slate-300 dark:border-bord">
                    <div className="flex justify-center mt-4">
                        <h3 className="text-black dark:text-white text-2xl font-semibold">Sign In</h3>
                    </div>
                        <div className="px-6 space-y-4 mt-8">
                            <Input ref={emailref} type="text" placeholder="Email" />
                            <Input ref={passwordref} type="password" placeholder="Password" />
                        </div>
                        <div className="flex justify-center mt-4 px-6 cursor-pointer">
                            <Button  onClick={submit}  variants="primary" size="fl" text="Login in"/>
                        </div>
                    </div>
                </div>
    )
}