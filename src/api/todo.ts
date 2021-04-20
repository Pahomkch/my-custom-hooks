import axios from "axios"
import { ITodo } from "../types/types"

export function getTodos(pageNumber: number) {
    return axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_page=' + pageNumber)
}