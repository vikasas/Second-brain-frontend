import { Cross } from "../icons/Cross";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

enum Contenttype {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface contentprops {
  open: boolean;
  onclose: () => void;
}

export function Content({ open, onclose }: contentprops) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, Settype] = useState(Contenttype.Youtube);

  async function content() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
        { link, type, title },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      onclose();
      toast.success("Content added successfully");
    } catch (e) {
      console.log(e);
      toast.error("Error in adding, try again");
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 p-4">
          <div className="w-full max-w-md p-8 border border-bord bg-white dark:bg-bggg rounded-lg shadow-lg relative">
            <div className="absolute top-2 right-3 cursor-pointer" onClick={onclose}>
              <Cross />
            </div>
            <h5 className="text-xl font-semibold text-center">Add Content</h5>
            <div className="p-6 space-y-4">
              <Input ref={titleref} type="text" placeholder="Title" />
              <Input ref={linkref} type="text" placeholder="Link" />
              <div className="flex gap-3 justify-center">
                <Button
                  variants={type === Contenttype.Youtube ? "primary" : "secondary"}
                  onClick={() => Settype(Contenttype.Youtube)}
                  size="sm"
                  text="Youtube"
                />
                <Button
                  variants={type === Contenttype.Twitter ? "primary" : "secondary"}
                  onClick={() => Settype(Contenttype.Twitter)}
                  size="sm"
                  text="Twitter"
                />
              </div>
              <div className="flex justify-center">
                <Button onClick={content} variants="primary" size="md" text="Submit" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
