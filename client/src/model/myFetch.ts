const API_ROOT = import.meta.env.VITE_API_ROOT as string;

//representational state transfer method: carries out whatever the request is, and returns a promise of whatever the response is
export function rest(url: string, body?: unknown, method?: string, headers?: any) {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(response => response.ok ? response.json() : Promise.reject(response.statusText));
}

export function api(action: string, body?: unknown, method?: string, headers?: any) {
    return rest(`${API_ROOT}/${action}`, body, method, headers);
}