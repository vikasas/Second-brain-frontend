import { useRef, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { Symbol } from "../icons/Symbol";

export function Signup(){
    const emailref = useRef<HTMLInputElement>(null)
    const usernameref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [errors , setErrors] = useState<Record<string , string[]>>({});

    async function submit(){
        const email = emailref.current?.value;
        const username = usernameref.current?.value;
        const password = passwordref.current?.value;


try{
     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        email,
        username,
        password,
    })
    setErrors({});
    navigate("/signin");
    toast.success("Signed up succsefully");
}catch(err : unknown){
    if(axios.isAxiosError(err)){
    if(err.response?.data?.errors){
        const fieldrecord : Record<string , string[]> = {};
        err.response.data.errors.forEach((e: { path: string[]; message: string }) => {
            console.log(e);
            const field = e.path[0];
            if(!fieldrecord[field]){
                fieldrecord[field] = [];
            }
            fieldrecord[field].push(e.message);
        })
        setErrors(fieldrecord)
    }else{
        toast.error("An error occured please try again")
    }
}else{
    console.error("Unexpected error:", err);
    toast.error("An unknown error occurred.");
}
}
    }
    return(
        <div className="w-screen h-screen flex justify-evenly items-center">
        <div className="h-1/2  w-3/5 flex flex-col items-center">
            <div className="mt-8 w-3/4">
                <h4 className="font-bold text-6xl text-primary">Welocme to Second Brain...</h4>
                <p className="font-semibold text-xl mt-2 "> Save notes, links, and tasks in one place</p>
            </div>
        </div>
        <div className=" w-2/5  flex ml-4">
            <div className="w-96 p-5 bg-white  shadow-xl/20 border border-slate-300">
            <div className="flex justify-center mt-4">
                <h3 className="text-black text-2xl font-semibold">Sign Up</h3>
            </div>
                <div className="px-6 space-y-4 mt-8">
                    <div>
                        <Input ref={emailref} type="text" placeholder="email" />
                        {errors.email?.map((msg , id) => (
                        <p key={id} className="text-red-600 text-xs">{msg}</p>
                         ))}
                    </div>
                   <div>
                        <Input ref={usernameref} type="text" placeholder="Username" />
                        {errors.username?.map((msg , id) => (
                        <p key={id} className="text-red-600 text-xs">{msg}</p>
                    ))}
                   </div>
                   <div>
                    <Input ref={passwordref} type="password" placeholder="Password" />
                    {errors.password?.map((msg , id) => (
                        <p key={id} className="text-red-600 text-xs">{msg}</p>
                    ))}
                   </div>
                  
                </div>
                <div className="flex justify-center  px-6 mt-4 cursor-pointer">
                    <Button onClick={submit}  variants="primary" size="fl" text="Signup"/>
                </div>
                <div className="flex flex-col justify-end px-6 mt-3 space-y-2">
                    <p className="text-black font-medium text-xs">Already Signed in ?</p>
                   <Button onClick={() => {
                    navigate("/signin")
                   }} variants="secondary" size="fl" text="Login"/>
                </div>
            </div>
            </div>
        </div>
    )
}