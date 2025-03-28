/**
 *
 * @param {string} txt - The input text to be sliced
 * @param {number} {max = 50} - The maximum length before truncation
 * @returns - The sliced text, with an ellipsis ( ... ) appended if truncated
 */

export function textSlicer(txt: string, max: number = 80) {
  if (txt.length > max) {
    return `${txt.slice(0, max)} ...`;
  } else {
    return txt;
  }
}

/**
 * @param {string | number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price: string | number): string => {
  const priceNumber = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(priceNumber)) return price.toString();
  return priceNumber.toLocaleString("en-US");
};
