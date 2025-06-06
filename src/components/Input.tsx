import React, { forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      type={props.type}
      ref={ref}
      placeholder={props.placeholder}
      className="bg-gray-300 dark:bg-input w-full h-10  p-2 rounded-md"
    />
  );
});

