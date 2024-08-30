import { endpoint } from "./endpoint"

const getAllBooks = async() => {
    const response = await fetch(endpoint+'/books')
    const data = await response.json()
    return data
}
export default getAllBooks