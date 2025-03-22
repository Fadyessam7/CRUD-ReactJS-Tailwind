import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  /*-------- STATE --------*/
  const [isOpen, setIsOpen] = useState(false);

  /*-------- HANDLER --------*/
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  /*-------- RENDER --------*/
  const renderProductList = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  const renderInputsList = formInputsList.map((input) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={input.id}
          className="mb-[3px] text-sm font-medium text-gray-700"
        >
          {input.label}
        </label>
        <Input type={input.type} id={input.id} name={input.name}></Input>
      </div>
    );
  });
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Button className="bg-green-700 w-fit" onClick={open}>
        Open Modal
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={close} title={"Add New Product"}>
        <form className="space-y-3">
          {renderInputsList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
