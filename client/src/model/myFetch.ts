const API_ROOT =  import.meta.env.VITE_API_ROOT as string;
console.log(API_ROOT); // this will log the value of VITE_API_ROOT from .env file. This is only possible with import.

//representational state transfer method: carries out whatever the request is, and returns a promise of whatever the response is
export async function rest(url: string, body?: unknown, method?: string, headers?: any) {
    return fetch(url, {
        method: method ?? (body ? "POST" : "GET"),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    })
        .then(response => response.ok 
            ? response.json()
            : response.json().then(err => Promise.reject(err))
        )

}

export function api(action: string, body?: unknown, method?: string, headers?: any) {
    return rest(`${API_ROOT}/${action}`, body, method, headers);
}