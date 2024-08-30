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
    throw new Error(response.statusText);
  }
  const obj = await response.json();
  return obj;
};
export default addBook;
