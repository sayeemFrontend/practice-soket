import { getData, getSingle } from "./../requestMethod"
const url = "/api/category/"

export const categoryApi = {
    get: () => {
        return getData(`${url}`)
    },
    getSingle: (id) => {
        return getSingle(`${url}${id}`)
    },
    getProduct: (id, page, limit) => {
        return getData(`${url}${id}/product/?page=${page}&limit=${limit}`)
    }
}

//ful from

/* get:(id)=>{
const data=getData(`${url}?${id}`)
return data
}
*/

// Can be written as

/* const get:getData

function getData (id){
    const data=getData(`${url}?${id}`)
 return data
}
*/
