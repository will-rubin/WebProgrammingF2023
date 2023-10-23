<script setup lang="ts">
    import { getSession, useLogin } from '@/model/session'
    import { type User, getUsers} from '@/model/users'

    let users = getUsers()

    const session = getSession()

    const { login, logout } = useLogin()

    function doLogin(user: User) {
        login(user.email, user.password);
    }
    
    const doLogout = () => {
        logout();
    }
</script>

<template>
    <div class="has-text-centered" v-if="session.user">
        <strong>Welcome, {{ session.user.firstName }} {{ session.user.lastName }}!</strong> <br />
        <small>
            {{ session.user.email }}
            <a class="button is-small is-light is-warning" @click.prevent="doLogout">
                <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
            </a>
        </small>
    </div>
    <div>
        <div class="panel-heading" v-if="!session.user">Login</div>
        <label class="panel-block" v-for="user in users">
            <button class="button is-fullwidth is-primary" @click.prevent="doLogin(user)">
                <span class="icon">
                    <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>{{ user.firstName }} {{ user.lastName }}: {{ user.role }}</span>
            </button>
        </label>
    </div>
</template>



<style scoped>

</style>