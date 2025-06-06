import { ReactElement } from "react"

 interface buttonpops {
    variants :  "primary" | "secondary",
    size: "lg" | "md" | "sm" | "fl",
    starticon ?: ReactElement,
    endicon ?: ReactElement,
    text : string,
    onClick ?: () => void,
    readonly?:boolean
}

const variantstyle = {
  primary: "bg-primary text-white dark:bg-white dark:hover:bg-btnhover dark:text-black font-medium rounded-md transition-colors duration-300 ",
  secondary: "bg-secondbtn text-secondtex dark:bg-white dark:hover:bg-btnhover dark:text-black font-medium rounded-md"
};

const sizestyle = {
    lg : "px-8 py-4",
    md : "px-7 py-3",
    sm : "px-5 py-2",
    fl : "w-full p-2",
}


export const Button = (props : buttonpops) => {
  if(props.readonly) return null;
    return(
      <button
      onClick={props.onClick}
      className={`${variantstyle[props.variants]} ${sizestyle[props.size]} flex items-center justify-center gap-x-2 cursor-pointer`}
    >
      {props.starticon}
      {props.text}
      {props.endicon}
    </button>
    )
} 