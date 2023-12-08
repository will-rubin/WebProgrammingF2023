<script setup lang="ts">
import { type User, createUser, updateUser, deleteUser, getUsers } from '@/model/users'
import { getSession } from '@/model/session'
import { ref, reactive } from 'vue'

const session = getSession()
const role = session.user?.role


const users = ref<User[]>([])
await getUsers().then((data) => {
    users.value = data
})


</script>

<template>
    
</template>

<style scoped>
    .column {
        top: 50px;
    }
</style>