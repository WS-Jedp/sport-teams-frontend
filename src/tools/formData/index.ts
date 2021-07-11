type Data ={
    [key:string]: any
}

export const transformToFormData = (data:Data):FormData => {
    const formData = new FormData()

    for(let key in data) {
        formData.append(key, data[key])
    }

    return formData
}