import axios, { AxiosRequestConfig, Method, AxiosError, AxiosResponse } from 'axios'

const port = 3099
// const baseURL = process.env.ENVIRONMENT === 'dev' ? `http://localhost:${port}/api/` : 'https://report-server-api.vercel.app/api/'
const baseURL = 'https://report-server-api.vercel.app/api/'

const handleError = (error: AxiosError) => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        console.log(error.message);
    }
};

const api_call = async (method: Method, body: any, url: string) => {
    const config: AxiosRequestConfig = {
        url,
        method,
        baseURL,
        data: body,
    }

    try {
        const rsp = await axios(config)
        return rsp.data
    } catch (e: any) {
        handleError(e)
    }
}
export const api_call_get = (url: string) => {
    return api_call('GET', null, url)
}
export const api_call_post = (url: string, body: any) => {
    return api_call('POST', body, url)
}
export const api_call_put = (url: string, body: any) => {
    return api_call('PUT', body, url)
}
export const api_call_delete = (url: string) => {
    return api_call('DELETE', null, url)
}