import { endpoint } from "./endpoint";

const addBook = async (data) => {
  const response = await fetch(endpoint + "/books", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    if (response.status === 409) {
      throw new Error(`A book with ${data.isbn} ISBN already exists`);
    }
    throw new Error(response.statusText);
  }
  const obj = await response.json();
  return obj;
};
export default addBook;
