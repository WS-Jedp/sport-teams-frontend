import { transformToFormData } from '../../tools/formData'
interface GetRequest {
    url: string,
    token?: string
}

interface PostRequest {
    url: string,
    body: {[key:string]: any},
    token?: string
}

export const useGet = async (data:GetRequest) => {
    const resp = await fetch(data.url, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${data.token && data.token}`
        }
    })
    const json = resp.json()
    return json
}

export const usePost = async (data:PostRequest) => {
    const resp = await fetch(data.url, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${data.token && data.token}`
        },
        body: transformToFormData(data.body)
    })
    const json = resp.json()
    return json
}