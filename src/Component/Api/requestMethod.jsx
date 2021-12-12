import { baseUrl } from "./baseUrl"
import axios from "axios"


export async function getData(url) {
    const { data } = await axios.get(baseUrl + url)
    return data.data
}

export async function getSingle(url) {
    const { data } = await axios.get(baseUrl + url)
    return data
}
