//** productObj === errorsObj (TITLE , DESCRIPTION,IMAGE,PRICE)
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const validUrl =
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)(?:\?.*)?)$/.test(
      product.imageURL
    );
  if (
    !product.title.trim() ||
    product.title.length < 6 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 6 and 80 characters!";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters!";
  }
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid Image URL is required";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid Price Is Required";
  }
  return errors;
};
