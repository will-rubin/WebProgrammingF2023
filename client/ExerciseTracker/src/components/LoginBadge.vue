<script setup lang="ts">
    import { getSession, useLogin } from '@/model/session'

    const session = getSession()

    const { login, logout } = useLogin()

    const doLogin1 = () => {
        login("john@doe.com", "1345678");
    }

    const doLogin2 = () => {
        login("jane@doe.com", "1235678");
    }

    const doLogin3 = () => {
        login("jon@smith.com", "1234568");
    }
    
    const doLogout = () => {
        logout();
    }
</script>

<template>
    <div class="has-text-centered" v-if="session.user">
        Welcome, {{ session.user.firstName }} {{ session.user.lastName }}! <br />
        <small>
            {{ session.user.email }}
            <a class="button is-small is-light is-warning" @click.prevent="doLogout">
                <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
            </a>
        </small>
    </div>
    <div v-else>
        <div class="control">
            <label class="radio">
                <input type="radio" name="answer" @click="doLogin1">
                John Doe (Admin)
            </label>
            <label class="radio">
                <input type="radio" name="answer" @click="doLogin2">
                Jane Doe
            </label>
            <label class="radio">
                <input type="radio" name="answer" @click="doLogin3">
                John Smith
            </label>
        </div>
    </div>
</template>



<style scoped>

</style>