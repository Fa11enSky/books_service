import { endpoint } from "./endpoint";

const editBook = async (isbn, updates) => {
  const response = await fetch(endpoint + "/books/" + isbn, {
    method: "PUT",
    body: JSON.stringify(updates),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    if (response.status === 409) {
      throw new Error(`A book with ${updates.isbn} ISBN already exists`);
    }
    throw new Error(response.statusText);
  }
  return response.json();
};
export default editBook;
