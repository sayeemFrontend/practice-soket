export function getName(id, categories) {
    const data = categories.find(it => it._id === id)
    if (data) {
        return data.name + ","
    }
    else {
        return ""
    }
}