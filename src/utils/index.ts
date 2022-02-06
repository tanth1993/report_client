import { parse } from 'query-string'
export { api_call_get, api_call_put, api_call_delete, api_call_post } from './apiCall'
export { femaleAvt, maleAvt, badageAvt, bookAvt, notebookAvt, overviewAvt, userInfo } from './svg'
export { useAppDispatch, useAppSelector } from './hooks'

export const colorList = ['#ffb800', '#ff8a00', '#00b2ff', '#2979ff', '#22c993', '#fc625d', '#2c3e50', '#ecf0f1', '#2ecc71', '#ccc']
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
    var str: string[] = [];
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

export const dateLocaleVNFormatter = (isoDate?: string) => isoDate ? new Date(isoDate).toLocaleDateString('vi-VN') : new Date().toLocaleString()

export function debounce(func: Function, wait: number, immediate?: boolean) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout: any;

    // Calling debounce returns a new anonymous function
    return function () {
        // reference the context and args for the setTimeout function
        var context = this,
            args = arguments;

        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;

        // This is the basic debounce behaviour where you can call this 
        //   function several times, but it will only execute once 
        //   [before or after imposing a delay]. 
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function () {

            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;

            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);

        // Immediate mode and no wait timer? Execute the function..
        if (callNow) func.apply(context, args);
    }
}