import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col m-1.5">
      <Image
        imageURL={product.imageURL}
        alt={"product name"}
        className={"w-full h-auto rounded-md object-cover aspect-[4/3]"}
      ></Image>
      <h3>{product.title}</h3>
      <p>{textSlicer(product.description)}</p>
      <div className="flex items-center my-4 space-x-2">
        <span className="w-6 h-6 rounded-full bg-indigo-500 "></span>
        <span className="w-6 h-6 rounded-full bg-yellow-500 "></span>
        <span className="w-6 h-6 rounded-full bg-red-500 "></span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-indigo-900">${product.price}</span>
        <Image
          imageURL={product.category.imageURL}
          alt={product.category.name}
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
