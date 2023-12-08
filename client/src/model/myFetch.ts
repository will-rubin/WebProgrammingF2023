const API_ROOT =  import.meta.env.VITE_API_ROOT as string;
console.log(API_ROOT); // this will log the value of VITE_API_ROOT from .env file. This is only possible with import.

//representational state transfer method: carries out whatever the request is, and returns a promise of whatever the response is
export async function rest(url: string, body?: unknown, method?: string, headers?: any) {
    const requestOptions: RequestInit = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

export function api(action: string, body?: unknown, method?: string, headers?: any) {
    return rest(`${API_ROOT}/${action}`, body, method, headers);
}