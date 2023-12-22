<script setup lang="ts">
import { type User, createUser, updateUser, deleteUser, getUsers } from '@/model/users'
import { getSession } from '@/model/session'
import { ref, } from 'vue'

const session = getSession()
const role = session.user?.role


const users = ref<User[]>([])
await getUsers().then((data) => {
    users.value = data
})

const selectedUser = ref(null as User | null)
const isEditModalOpen = ref(false)
const openEditModal = (user: User) => {
    selectedUser.value = user
    isEditModalOpen.value = true
}
const closeEditModal = () => {
    selectedUser.value = null
    isEditModalOpen.value = false
}

const eUserID = ref(selectedUser.value?.id)
const eUserFullName = ref(selectedUser.value?.fullName)
const eUserEmail = ref(selectedUser.value?.email)
const eUserRole = ref(selectedUser.value?.role)
const eUserPassword = ref(selectedUser.value?.password)
const eUserImageURL = ref(selectedUser.value?.imageURL)
const eUserFriends = ref(selectedUser.value?.friends)

const editUser = async (eUserFullName: string, eUserEmail: string, eUserRole: string, eUserPassword: string, eUserImageURL: string, eUserID: number) => {
    const editedUser = {
        id: eUserID,
        fullName: eUserFullName,
        email: eUserEmail,
        role: eUserRole,
        password: eUserPassword,
        imageURL: eUserImageURL,
        friends: []
    }
    await updateUser(editedUser)
    await getUsers().then((data) => {
        users.value = data
    })
    closeEditModal()
}

const isAddModalOpen = ref(false)
const openAddModal = () => {
    isAddModalOpen.value = true
}
const closeAddModal = () => {
    isAddModalOpen.value = false
}
const newUserID = ref(null as number | null)
const newUserFullName = ref(null as string | null)
const newUserEmail = ref(null as string | null)
const newUserRole = ref(null as string | null)
const newUserPassword = ref(null as string | null)
const newUserImageURL = ref(null as string | null)


const addUser = async (newUserFullName: string, newUserEmail: string, newUserRole: string, newUserPassword: string, newUserImageURL: string, newUserID: number) => {
    const newUser = {
        id: newUserID,
        fullName: newUserFullName,
        email: newUserEmail,
        role: newUserRole,
        password: newUserPassword,
        imageURL: newUserImageURL,
        friends: []
    }
    await createUser(newUser)
    await getUsers().then((data) => {
        users.value = data
    })
    closeAddModal()
}


</script>

<template>
    <div class="box">
        <div class="columns">
            <div class="column">
                <h1 class="title">Admin</h1>
            </div>
        </div>
    </div>


    <div class="column">
        <div v-if="role === 'admin'">
            <div class="box">
                <div class="columns">
                    <div class="column">
                        <button @click="openAddModal()">Add User</button>
                    </div>
                </div>
            </div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="user in users" :key="user.email">
                        <td>{{ user.fullName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <button @click="openEditModal(user)">Edit</button>
                            <button @click="deleteUser(user.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h2>Access Denied</h2>
        </div>
        <div v-if="isEditModalOpen" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title">Edit User</h1>
                    <div class="field">
                        <label class="label">ID</label>
                        <div class="control">
                            <input class="input" type="text" v-model="eUserID" placeholder="ID">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text" v-model="eUserEmail" placeholder="email">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Full Name</label>
                        <div class="control">
                            <input class="input" type="text" v-model="eUserFullName" placeholder="Full Name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="text" v-model="eUserPassword" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Role</label>
                        <div class="control">
                            <input class="input" type="number" v-model="eUserRole" placeholder="Role">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">ImageURL</label>
                        <div class="control">
                            <input class="input" type="number" v-model="eUserImageURL" placeholder="Image URL">
                        </div>
                    </div>
                </div>
                <button
                    @click="editUser(eUserFullName ?? '', eUserEmail ?? '', eUserRole ?? '', eUserPassword ?? '', eUserImageURL ?? '', eUserID ?? 0)">Edit
                    User</button>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closeEditModal()"></button>
        </div>
        <div v-if="isAddModalOpen" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title">Add User</h1>
                    <div class="field">
                        <label class="label">ID</label>
                        <div class="control">
                            <input class="input" type="number" v-model="newUserID" placeholder="ID">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text" v-model="newUserEmail" placeholder="email">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Full Name</label>
                        <div class="control">
                            <input class="input" type="text" v-model="newUserFullName" placeholder="Full Name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="text" v-model="newUserPassword" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Role</label>
                        <div class="control">
                            <input class="input" type="text" v-model="newUserRole" placeholder="Role">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">ImageURL</label>
                        <div class="control">
                            <input class="input" type="text" v-model="newUserImageURL" placeholder="Image URL">
                        </div>
                    </div>
                </div>
                <button class="is-success"
                    @click="addUser(newUserFullName ?? '', newUserEmail ?? '', newUserRole ?? '', newUserPassword ?? '', newUserImageURL ?? '', newUserID ?? 0)">Add
                    User</button>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closeAddModal()"></button>
        </div>
    </div>
</template>

<style scoped>
.column {
    top: 50px;
}

table {
    border-collapse: collapse;
    width: 100%;
}</style>