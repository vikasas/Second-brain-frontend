import { useNavigate } from "react-router-dom";
import { Logout } from "../icons/Logout";
import { Symbol } from "../icons/Symbol";
import { Twitter } from "../icons/Twitter";
import { Youtube } from "../icons/Youtube";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";
import toast from "react-hot-toast";
import { X } from "lucide-react";

type SidebarProps = {
  onFilter: (type: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ onFilter, isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  function logout() {
    try {
      localStorage.removeItem("token");
      toast.success("Logged out Successfully");
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("Try again later");
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

     <div
  className={`
    fixed top-0 left-0 h-full md:h-screen z-50 w-64 bg-cardbg dark:bg-bggg shadow-xl border-r border-slate-200 dark:border-bord transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block
  `}
>

        <div className="flex justify-between items-center mt-4 px-6">
          <div className="flex items-center gap-x-2 text-primary">
            <Symbol />
            <h3 className="font-bold text-2xl text-headingcol">Second Brain</h3>
          </div>
          {/* Close button on mobile */}
          <button onClick={onClose} className="md:hidden text-gray-500">
            <X />
          </button>
        </div>

        <div className="mt-10 space-y-2  cursor-pointer">
        <div className="px-8 py-3 hover:bg-slate-400 dark:hover:bg-input">
          <SidebarItem
            onClick={() => {
              onFilter("twitter");
              onClose();
            }}
            text="Twitter"
            icon={<Twitter />}
          />
          </div>
          <div className="px-8 py-3 hover:bg-slate-400 dark:hover:bg-input">
          <SidebarItem
            onClick={() => {
              onFilter("youtube");
              onClose();
            }}
            text="Youtube"
            icon={<Youtube />}
          />
          </div>
          <div className="px-8 py-3 hover:bg-slate-400 dark:hover:bg-input">
          <SidebarItem
            onClick={() => {
              onFilter("");
              onClose();
            }}
            text="All Content"
            icon={<Symbol />}
          />
           </div>
        </div>

        <div className="absolute bottom-6 w-full flex justify-center">
          <Button
            text="Logout"
            size="sm"
            endicon={<Logout />}
            variants="primary"
            onClick={logout}
          />
        </div>
      </div>
    </>
  );
}
