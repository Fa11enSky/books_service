import { endpoint } from "./endpoint";

const changeBorrowStatus = async (isbn, status) => {
  const response = await fetch(endpoint + "/books/" + isbn + "/borrow", {
    method: "PATCH",
    body: JSON.stringify(status),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export default changeBorrowStatus;
