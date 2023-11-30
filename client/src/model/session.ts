import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import * as myFetch from './myFetch';
import { type User, getUserByEmail } from './users';

const session = reactive({
    user: null as User | null,
    redirectURL: null as string | null
});

export function api(action: string, body: string) {
    return myFetch.api(`${action}`, `${body}`);
}

export function getSession() {
    return session;
}

export function getCurrentUser() {
    return session.user;
}

export function useLogin(){
    const router = useRouter();
    return async function login(email: string, password: string) {
        const user = await getUserByEmail(email);
        if (user && user.password === password) {
            session.user = user;
            if (session.redirectURL) {
                router.push(session.redirectURL);
                session.redirectURL = null;
            } else {
                router.push('/');
            }
        } else {
            alert('Login failed');
        }
    }
}