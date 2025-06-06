import axios from "axios";
import { useEffect } from "react";
import { Delete } from "../icons/Delete";
// import { Share } from "../icons/Share";
import { Twitter } from "../icons/Twitter";
import { Youtube } from "../icons/Youtube";


interface cardprops {
  id: string;
  type: "note" | "youtube" | "twitter";
  title: string;
  link: string;
  readOnly?:boolean
}

export function Card(props: cardprops) {
  const getYoutubeEmbedUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      const videoId = parsedUrl.searchParams.get("v");
      if (!videoId) {
        console.error("No video ID found in URL:", url);
        return "";
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
      console.error("Invalid URL passed to getYoutubeEmbedUrl:", url, err);
      return "";
    }
  };

  async function Deletecontent(id: string) {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      console.log("Deleted content with ID:", id);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  }

  const normalizedType = props.type?.toLowerCase();

  // Load Twitter embed script if type is twitter
  useEffect(() => {
    if (normalizedType === "twitter") {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load();
      }
    }
  }, [normalizedType, props.link]);

  return (
    <div className="w-92 h-auto bg-cardbg dark:bg-bggg shadow-md rounded-md border border-slate-200 dark:border-bord p-5">
      <div className="flex justify-between">
        <div className="flex gap-x-3 items-center">
          <span className="text-cardicons dark:fill-white">
            {normalizedType === "youtube" ? <Youtube /> : normalizedType === "twitter" ? <Twitter /> : null}
          </span>
          <span className="text-white dark:text-white">{props.title}</span>
        </div>
        <div className="flex gap-x-4  text-cardicons">
          {/* <div><Share/></div> */}
          {!props.readOnly &&<div
            onClick={() => {
              Deletecontent(props.id);
            }}
            className="cursor-pointer "
          >
            <span className="text-cardicons dark:fill-cardico"><Delete /></span>
          </div>}
        </div>
      </div>
      <div className="w-full mt-4 flex justify-center items-center">
        {normalizedType === "youtube" && (
          <iframe
            className="w-full h-82"
            src={getYoutubeEmbedUrl(props.link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        {normalizedType === "twitter" && (
          <blockquote className="twitter-tweet w-full">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
