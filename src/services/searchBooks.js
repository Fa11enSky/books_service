import { endpoint } from "./endpoint"

const searchBooks = async(query) => {
    const response = await fetch(endpoint + '/books/search?query=' + query)
    if (response.status !== 200) {
        throw new Error(response.statusText)
    }
    return response.json()
}
 
export default searchBooks