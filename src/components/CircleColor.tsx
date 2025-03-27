import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={`block w-6 h-6 rounded-full cursor-pointer mb-1`}
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};

export default CircleColor;
