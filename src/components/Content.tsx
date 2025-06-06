
import { Cross } from "../icons/Cross"
import { Button } from "./Button"
import { Input } from "./Input"
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


enum Contenttype {
    Youtube = "youtube",
    Twitter = "twitter",

}

export function Content({open , onclose}){

   const titleref = useRef<HTMLInputElement>(null);
   const linkref = useRef<HTMLInputElement>(null);
   const [type , Settype] = useState(Contenttype.Youtube);


    async function content(){
        const title = titleref.current?.value;
        const link = linkref.current?.value;
        try{
         await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content` ,{
            link,
            type,
            title,
        }, {
            headers:{
                "Authorization" : localStorage.getItem("token")
            }
        })
        onclose();
        toast.success("Content added Sucussefuly")
    }catch(e){
        console.log(e);
        toast.error("Error in adding try again")
    }

    }
    return(
        <div>
            {open && <div className="w-screen h-screen bg-slate-100 dark:bg-black top-0 left-0 fixed opacity-90 z-10 flex justify-center items-center">
                <div className="w-1/4 h-82 bg-white dark:bg-bggg  shadow-lg rounded-md">
                    <div className="flex justify-end  mt-4 mr-4 cursor-pointer">
                        <div onClick={onclose}>
                            <Cross/>
                        </div>
                    </div>
                    <div className="px-8 space-y-4 mt-8">
                        <Input ref={titleref} type="text" placeholder="Title" />
                        <Input ref={linkref} type="text" placeholder="Link" />
                    </div>
                    <div className="flex  mt-3 gap-x-3 justify-center">
                        <Button variants={type === Contenttype.Youtube ? "primary" : "secondary"} onClick={()=>{Settype(Contenttype.Youtube)}}size="sm" text="Youtube" />
                        <Button variants={type === Contenttype.Twitter ? "primary" : "secondary"} onClick={() => {Settype(Contenttype.Twitter)}} size="sm" text="Twitter"/>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button onClick={content} variants="primary" size="md" text="Submit" />
                    </div>
                </div>
                </div>}
        </div>
    )
}

