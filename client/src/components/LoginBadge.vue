<script setup lang="ts">
    import { getSession, useLogin } from '@/model/session'
    import { type User, getUsers } from '@/model/users'
    import { ref } from 'vue';

    const myUsers = ref([] as User[])
    await getUsers().then((data) => {
        myUsers.value = data;
    })

    const session = ref(getSession())

    const { login, logout } = await useLogin()

    function doLogin(user: User) {
        login(user.email, user.password);
    }
    
    const doLogout = () => {
        logout();
    }
</script>

<template>
    <div class="has-text-centered" v-if="session.user">
        <strong>Welcome, {{ session.user.fullName }}!</strong> <br />
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
        <div class="panel-heading" v-if="!session.user">Login
            <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
            </span>
            <label class="panel-block" v-for="user in myUsers">
                <button class="button is-fullwidth is-primary" @click.prevent="doLogin(user)">
                    <span class="icon">
                        <i class="fas fa-sign-in-alt"></i>
                    </span>
                    <span>{{ user.fullName }}: {{ user.role }}</span>
                </button>
            </label>
        </div>
    </div>
</template>



<style scoped>

</style>