<script setup lang="ts">
import { type User, addUser, editUser, deleteUser, getUsers } from '@/model/users'
import { getSession } from '@/model/session'
import { ref, reactive } from 'vue'

const session = getSession()
const role = session.user?.role


let users = getUsers() as User[]

const selectedUserDeletion = users[0]

const selectedUser = users[0]
const newIDEdit = ref(0)
const fNameEdit = ref("")
const lNameEdit = ref("")
const newEmailEdit = ref("")
const newPasswordEdit = ref("")
const newRoleEdit = ref("")
const newImageURLEdit = ref("")


const newID = ref(0)
const fName = ref("")
const lName = ref("")
const newEmail = ref("")
const newPassword = ref("")
const newRole = ref("")
const newImageURL = ref("")

function addNewUser(fName: string, lName: string, newEmail: string, newPassword: string, newRole: string, newImageURL: string) {
    const newUser: User = {
        id: users.length + 1,
        firstName: fName,
        lastName: lName,
        email: newEmail,
        password: newPassword,
        role: newRole,
        imageURL: newImageURL
    }
    addUser(newUser)
}

function editExistingUser(user: User, newIDEdit: number, fName: string, lName: string, newEmail: string, newPassword: string, newRole: string, newImageURL: string) {
    editUser(user, newIDEdit, fName, lName, newEmail, newPassword, newRole, newImageURL)
}
</script>

<template>
    <div class="columns" v-if="role === 'admin'">
        <div class="column is-three-quarters is-centered">
            <div class="panel">
                <div class="panel-heading">Add a New User</div>
                <div class="panel-block">
                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="First Name" v-model="fName">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Last Name" v-model="lName">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Email" v-model="newEmail">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Password" v-model="newPassword">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Role</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="newRole">
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Image URL</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Image URL" v-model="newImageURL">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" @click.prevent="addNewUser(fName, lName, newEmail, newPassword, newRole, newImageURL)">Add User</button>
                        </div>
                    </div>
                </div>
            </div>
              <div class="panel">
                <div class="panel-heading">Edit User</div>
                    <div class="panel-block">
                        <label class="label">Select User</label>
                        <div class="select">
                            <select v-model="selectedUser">
                                <option v-for="user in users" :key="user.id" :value="user">{{ user.firstName }} {{ user.lastName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="panel-block">
                        <div class="field">
                            <label class="label">ID</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="ID" v-model="newIDEdit">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">First Name</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="First Name" v-model="fNameEdit">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Last Name</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Last Name" v-model="lNameEdit">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Email" v-model="newEmailEdit">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Password" v-model="newPasswordEdit">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Role</label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="newRoleEdit">
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Image URL</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Image URL" v-model="newImageURLEdit">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary" @click.prevent="editExistingUser(selectedUser, newIDEdit, fNameEdit, lNameEdit, newEmailEdit, newPasswordEdit, newRoleEdit, newImageURLEdit)">Edit User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-heading">Delete User</div>
                    <div class="panel-block">
                        <label class="label">Select User</label>
                        <div class="select">
                            <select v-model="selectedUserDeletion">
                                <option v-for="user in users" :key="user.id" :value="user">{{ user.firstName }} {{ user.lastName }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary" @click.prevent="deleteUser(selectedUserDeletion)">Delete User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <table class="table">
                        <thead>
                            <label class="label">Users</label>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td>{{ user.id }}</td>
                                <td>{{ user.firstName }}</td>
                                <td>{{ user.lastName }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.role }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>  
    </div>
    <div class="columns" v-else>
        <div class="column has-text-centered">
            <box class="box">
               <h1>You are not authorized to view this page.</h1>
            </box>
        </div>
    </div>
</template>

<style scoped>
    .column {
        top: 50px;
    }
</style>