import { ReactElement } from "react"

interface ButtonProps {
  variants: "primary" | "secondary",
  size: "lg" | "md" | "sm" | "fl",
  starticon?: ReactElement,
  endicon?: ReactElement,
  text: string,
  onClick?: () => void,
  readonly?: boolean
}

const variantStyle = {
  primary:
    "bg-primary text-white dark:bg-white dark:text-black hover:bg-opacity-90 dark:hover:bg-btnhover font-medium rounded-md transition-colors duration-300",
  secondary:
    "bg-secondbtn text-secondtex dark:bg-white dark:text-black hover:bg-opacity-90 dark:hover:bg-btnhover font-medium rounded-md"
};

const sizeStyle = {
  lg: "px-8 py-4 text-base sm:text-lg",
  md: "px-7 py-3 sm:px-5 sm:py-2 text-sm sm:text-base",
  sm: "px-5 py-2 text-sm",
  fl: "w-full p-2 text-base"
};

export const Button = (props: ButtonProps) => {
  if (props.readonly) return null;

  return (
    <button
      onClick={props.onClick}
      className={`
        ${variantStyle[props.variants]}
        ${sizeStyle[props.size]}
        flex items-center justify-center gap-x-2 
        cursor-pointer 
        focus:outline-none 
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {props.starticon}
      {props.text}
      {props.endicon}
    </button>
  );
};
