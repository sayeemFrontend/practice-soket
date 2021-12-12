
import { getData, getSingle } from "./../requestMethod"

const url = "/api/product/"

export const productApi = {
    get: (page, limit) => {
        return getData(`${url}?page=${page}&limit=${limit}`)
    },
    getSingle: (id) => {
        return getSingle(`${url}${id}`)
    }
}