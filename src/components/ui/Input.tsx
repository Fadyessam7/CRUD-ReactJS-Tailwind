import { InputHTMLAttributes, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      type="text"
      className="border-2 border-gray-300 shadow-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-2 text-md"
      {...rest}
    />
  );
};

export default memo(Input);
