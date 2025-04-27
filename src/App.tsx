import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { ProductNameTypes } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    // value: "",
    price: "",
    colors: [],
    category: {
      imageURL: "",
      name: "",
    },
  };
  /*-------- STATE --------*/
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  // console.log(tempColors);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /*-------- HANDLER --------*/
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openEditModal() {
    setIsOpenEditModal(true);
  }

  function closeEditModal() {
    setIsOpenEditModal(false);
  }
  function openConfirmModal() {
    setIsOpenConfirmModal(true);
  }
  function closeConfirmModal() {
    setIsOpenConfirmModal(false);
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
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onCancel = (): void => {
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };

  const removeProductHandler = () => {
    const filteredProduct = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filteredProduct);
    closeConfirmModal();
    toast("Product Has Been Deleted", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    if (
      !title ||
      !description ||
      !price ||
      !imageURL ||
      tempColors.length === 0
    ) {
      toast("Please fill in all fields and select at least one color", {
        icon: "⚠️",
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    if (Object.values(errors).some((value) => value !== "")) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    // console.log(errors);

    if (!hasErrMsg) {
      setErrors(errors);
    }
    const updatedProduct = [...products];
    updatedProduct[productToEditIndex] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProduct);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };
  /*-------- RENDER --------*/
  const renderProductList = products.map((product, index) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setProductToEdit={setProductToEdit}
        setIsOpenEditModal={openEditModal}
        index={index}
        setProductToEditIndex={setProductToEditIndex}
        setIsOpenConfirmModal={openConfirmModal}
      />
    );
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
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item != color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item != color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    ></CircleColor>
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[3px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          id={id}
          type="text"
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        ></Input>
        <ErrorMessage msg={""}></ErrorMessage>
      </div>
    );
  };

  /*-------- App Component --------*/
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mt-8 mb-8">
        <Button
          className="bg-indigo-700 px-12"
          onClick={openModal}
          width="w-fit"
        >
          Build Product
        </Button>
      </div>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title={"ADD NEW PRODUCT"}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderInputsList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          ></Select>
          <div className="flex flex-wrap items-center my-4 space-x-2">
            {renderProductColors}
          </div>
          <div className="flex flex-wrap items-center my-4 space-x-2">
            {tempColors.map((color) => {
              return (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                >
                  {color}
                </span>
              );
            })}
          </div>
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
      {/* Edit Product Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title={"EDIT THIS PRODUCT"}
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "title",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          ></Select>
          <div className="flex flex-wrap items-center my-4 space-x-2">
            {renderProductColors}
          </div>
          <div className="flex flex-wrap items-center my-4 space-x-2">
            {tempColors.concat(productToEdit.colors).map((color) => {
              return (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                >
                  {color}
                </span>
              );
            })}
          </div>
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
      {/* Confirm Delete Modal*/}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title={"Are you sure you want to remove this Product from your Store?"}
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this intended action."
      >
        <div className=" flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            className="bg-[#e3e3e4] hover:bg-gray-300"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster></Toaster>
    </main>
  );
}

export default App;
