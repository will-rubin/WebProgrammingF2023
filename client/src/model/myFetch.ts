const API_ROOT = 'http://localhost:3000/api/v1';

//representational state transfer method: carries out whatever the request is, and returns a promise of whatever the response is
export function rest(url: string) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function api(action: string) {
    return rest(`${API_ROOT}/${action}`);
}