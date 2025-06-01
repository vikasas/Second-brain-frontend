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
      className="bg-gray-300 w-full h-10 ring-2 ring-second p-2 rounded-md"
    />
  );
});

