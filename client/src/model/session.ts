import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';  
import * as myFetch from './myFetch';
import { type User } from './users';

const toast = useToast();

const session = reactive({
    user: null as User | null,
    token: null as string | null,
    redirectURL: null as string | null,
    messages: [] as {
        type: string,
        text: string
    }[],
    loading: 0
    
});

export function api(action: string, body?: unknown, method?: string, headers?: any) {
    console.log("session.ts api action: " + action)
    console.log("session.ts api body: " + body)
    console.log("session.ts api method: " + method)
    console.log("session.ts api headers: " + headers)
    session.loading++;
    if(session.token) {
        headers = headers ?? {};
        headers.Authorization = `Bearer ${session.token}`;
    }
    return myFetch.api(`${action}`, body, method, headers)
        .catch(err => showError(err))
        .finally(() => session.loading--);
}

export function getSession() {
    return session;
}

export function getCurrentUserEmail() {
    let user = session.user as User;
    return user.email;
}

export function getCurrentUser() {
    let user = session.user as User;
    return user;
}

export function getCurrentUserFullName() {
    let user = session.user as User;
    return user.fullName;
}

export async function useLogin(){
    const router = useRouter();
    return {
        async login(email: string, password: string): Promise<User | null> {
            try {
                await api("users/login", { email, password }, "POST")
                .then((data: any) => {
                    session.user = data.user;
                    session.token = data.token;
                }).catch((err: any) => {
                    showError(err);
                });
                

                router.push(session.redirectURL ?? "/");
                return session.user;
            } catch (err) {
                showError(err);
                return null;
            }
        },
        logout() {
            session.user = null;
            session.token = null;
            router.push("/");
        }
    }
}

export function showError(err:any) {
    console.error(err);
    session.messages.push({ type: "error", text: err.message ?? err });
    toast.error( err.message ?? err ); 
}