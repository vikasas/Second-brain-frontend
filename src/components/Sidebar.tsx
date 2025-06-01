import { useNavigate } from "react-router-dom";
import { Logout } from "../icons/Logout";
import { Symbol } from "../icons/Symbol";
import { Twitter } from "../icons/Twitter";
import { Youtube } from "../icons/Youtube";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";
import toast from "react-hot-toast";

export function Sidebar(){
    const navigate = useNavigate();
    function logout(){
        try{
            localStorage.removeItem("token");
            toast.success("Loged out Succesfully");
            navigate("/signup");
        }catch(e){
            console.log(e);
            toast.error("Try again later");
        }
        
    }
    return(
        <div className="h-screen w-1/5 bg-cardbg shadow-xl top-0 left-0 absolute border border-slate-200 flex flex-col items-center">
            <div className="flex justify-start mt-4 pl-6 gap-x-2 w-full">
                <div className="flex items-center text-primary">
                    <Symbol/>
                </div>
                <div>
                    <h3 className="font-bold text-2xl text-headingcol">Second Brain</h3>
                </div>
            </div>
            <div className="w-2/3  mt-10 space-y-4 cursor-pointer ">
                <div className="hover:bg-second p-2 rounded-md">
                    <SidebarItem text="Twitter" icon={<Twitter/>} />
                </div>
                <div className="hover:bg-second p-3 rounded-md">
                    <SidebarItem  text="Youtube" icon={<Youtube/>} />
                </div>
            </div>
            <div className="mt-100 mr-6">
                <Button text="Logout" size="sm" endicon={<Logout/>} variants="primary" onClick={logout} />
            </div>
        </div>
    )
}