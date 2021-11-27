export { api_call_get, api_call_put, api_call_delete, api_call_post } from './apiCall'
export { femaleAvt, maleAvt, badageAvt, bookAvt, notebookAvt, overviewAvt, userInfo } from './svg'

export const sortDataByNames = (data: any[], key: string) => {
    return [...data]?.sort((a: any, b: any) => (a[key]?.toLocaleLowerCase() ?? 'a') > (b[key]?.toLocaleLowerCase() ?? 'b') ? -1 : 1)
}