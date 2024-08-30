import { endpoint } from "./endpoint";

const deleteBook = async (isbn) => {
  const response = await fetch(endpoint + "/books/" + isbn, {
    method: "DELETE",
  });
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response.json();
};
export default deleteBook