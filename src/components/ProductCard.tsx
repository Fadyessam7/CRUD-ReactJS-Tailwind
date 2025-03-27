import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, colors, price, category } = product;
  /*-------- RENDER --------*/
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color}></CircleColor>
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col m-1.5">
      <Image
        imageURL={imageURL}
        alt={"product name"}
        className={"w-full h-auto rounded-md object-center aspect-[4/3]"}
      ></Image>
      <h3 className="font-semibold my-3">{title}</h3>
      <p>{textSlicer(description)}</p>
      <div className="flex flex-wrap items-center my-4 space-x-2">
        {renderProductColors}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-indigo-900">${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className={
            "w-10 h-10 rounded-full border-gray-400 border-1 object-center"
          }
        ></Image>
      </div>
      <div className="flex items-center justify-between space-x-4 mt-5">
        <Button className="bg-indigo-700 ">EDIT</Button>
        <Button className="bg-red-700 ">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
