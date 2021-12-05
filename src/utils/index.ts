import { parse } from 'query-string'
export { api_call_get, api_call_put, api_call_delete, api_call_post } from './apiCall'
export { femaleAvt, maleAvt, badageAvt, bookAvt, notebookAvt, overviewAvt, userInfo } from './svg'
export { useAppDispatch, useAppSelector } from './hooks'

export const sortDataByNames = (data: any[], key: string) => {
    return [...data]?.sort((a: any, b: any) => (a[key]?.toLocaleLowerCase() ?? 'a') > (b[key]?.toLocaleLowerCase() ?? 'b') ? -1 : 1)
}

export const IsNullOrEmpty = (value: any) => {
    if (value === 0) {
        return false;
    }
    if (value == undefined) {
        return true;
    }
    if (value == null) {
        return true;
    }

    if (value == NaN) {
        return true;
    }
    if (value == '' && value !== 0 && value !== false) {
        return true;
    }
    if (value.trim && value.trim() === '') {
        return true;
    }
    return false;
}

export const serializeObj = (obj: any) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p) && !IsNullOrEmpty(obj[p])) {
            str.push(p + '=' + obj[p]);
        }
    return str.join('&');
}

export const parseQuerytoObj = (queryString: string) => {
    if (!queryString) return
    return parse(queryString, { parseBooleans: true, parseNumbers: true, arrayFormat: 'comma' })
}
