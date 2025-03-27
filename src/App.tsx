import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    value: "",
    price: "",
    colors: [],
    category: {
      imageURL: "",
      name: "",
    },
  };
  /*-------- STATE --------*/
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /*-------- HANDLER --------*/
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onCancel = (): void => {
    setProduct(defaultProductObj);
    closeModal();
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(errors);

    if (!hasErrMsg) {
      setErrors(errors);
    }
    console.log("SEND PRODUCT TO OUR SERVER");
  };

  /*-------- RENDER --------*/
  const renderProductList = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  const renderInputsList = formInputsList.map((input) => {
    return (
      <div className="flex flex-col" key={input.id}>
        <label
          htmlFor={input.id}
          className="mb-[3px] text-sm font-medium text-gray-700"
        >
          {input.label}
        </label>
        <Input
          type={input.type}
          id={input.id}
          name={input.name}
          value={product[input.name]}
          onChange={onChangeHandler}
        ></Input>
        <ErrorMessage msg={errors[input.name]}></ErrorMessage>
      </div>
    );
  });

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Button className="bg-green-700 w-fit" onClick={openModal}>
        Open Modal
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Add New Product"}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderInputsList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-300 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
