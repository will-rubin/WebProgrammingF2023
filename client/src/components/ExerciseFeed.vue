<script setup lang="ts">
import { type Post, getAllPosts, filterPostsByUser, createPost, updatePost, deletePost } from '@/model/posts';
import { getCurrentUserEmail, getCurrentUserFullName, getCurrentUser } from '@/model/session';
import { ref } from 'vue';

const posts = ref([] as Post[])
const selectedPost = ref(null as Post | null)
const isEditModalOpen = ref(false)
const isAddModalOpen = ref(false)

const user = getCurrentUser();

await getAllPosts().then((data) => {
    posts.value = data;
})

const postsByUser = filterPostsByUser(posts.value, getCurrentUserEmail());

const deletePostById = async (postId: number) => {
    await deletePost(postId);
    await getAllPosts().then((data) => {
        posts.value = data;
    })
}

const openEditModal = (post: Post) => {
    selectedPost.value = post
    isEditModalOpen.value = true
}

const openAddModal = () => {
    isAddModalOpen.value = true
}

const closeEditModal = () => {
    selectedPost.value = null
    isEditModalOpen.value = false
}

const closeAddModal = () => {
    isAddModalOpen.value = false
}

const ePostCaption = ref()
const ePostImageURL = ref('')
const ePostLocation = ref('')
const ePostDistance = ref(0)
const ePostDuration = ref(0)

const newPostTimeStamp = ref('')
const newPostCaption = ref()
const newPostImageURL = ref('')
const newPostLocation = ref('')
const newPostDistance = ref(0)
const newPostDuration = ref(0)


const addPost = async (newPostCaption: string, newPostImageURL: string, newPostLocation: string, newPostDistance: number, newPostDuration: number, newPostTimeStamp: string) => {
    const newPost = {
        id: 0,
        author: getCurrentUserEmail(),
        caption: newPostCaption,
        imageURL: newPostImageURL,
        location: newPostLocation,
        distance: newPostDistance,
        duration: newPostDuration,
        timestamp: newPostTimeStamp,
        fullName: getCurrentUserFullName()
    } as Post
    await createPost(newPost)
    await getAllPosts().then((data) => {
        posts.value = data;
    })
    closeAddModal()
}



const saveEditedPost = async (ePostCaption: string, ePostImageURL: string, ePostLocation: string, ePostDistance: number, ePostDuration: number) => {
    const editedPost = {
        ...selectedPost.value,
        caption: ePostCaption,
        imageURL: ePostImageURL,
        location: ePostLocation,
        distance: ePostDistance,
        duration: ePostDuration
    } as Post

    await updatePost(editedPost)
    await getAllPosts().then((data) => {
        posts.value = data;
    })
    closeEditModal()
}
</script>

<template>
    <div class="box">
        <h1 class="title has-text-centered">An area to add, edit, delete, and view your posts</h1>
    </div>
    <div class="box">
        <button class="button is-success" @click="openAddModal()">Add Post</button>
    </div>
    <div v-if="isAddModalOpen" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h1 class="title">Add Post</h1>
                <div class="field">
                    <label class="label">Caption</label>
                    <div class="control">
                        <input class="input" type="text" v-model="newPostCaption" placeholder="Caption">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Image URL</label>
                    <div class="control">
                        <input class="input" type="text" v-model="newPostImageURL" placeholder="Image URL">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <input class="input" type="text" v-model="newPostLocation" placeholder="Location">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Distance</label>
                    <div class="control">
                        <input class="input" type="number" v-model="newPostDistance" placeholder="Distance">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Duration</label>
                    <div class="control">
                        <input class="input" type="number" v-model="newPostDuration" placeholder="Duration">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Timestamp</label>
                    <div class="control">
                        <input class="input" type="number" v-model="newPostTimeStamp" placeholder="Duration">
                    </div>
                </div>
                <button class="button is-success"
                    @click="addPost(newPostCaption, newPostImageURL, newPostLocation, newPostDistance, newPostDuration, newPostTimeStamp)">Add
                    Post</button>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="panel">
            <p class="panel-heading has-text-centered">Your Posts</p>
            <div class="box" v-if="postsByUser.length == 0">
                <h1 class="title has-text-centered">You have no posts! Why not make one?</h1>
            </div>
            <div class="panel-block" v-for="post in postsByUser" :key="post.id">
                <article class="media-content">
                    <div class="media-content">
                        <div class="content">
                          <div class="card">

                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img :src="post.imageURL" alt="Post image">
                                </figure>
                            </div>

                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img :src="user.imageURL"
                                                alt="Profile picture">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">{{user.fullName}}</p>
                                        <p class="subtitle is-6">{{ user.email }}</p>
                                    </div>
                                </div>

                                <div class="content">
                                    {{  post.caption }}
                                    <br>
                                    <time :datetime="post.timestamp"></time>
                                </div>

                            </div>
                        </div>
                        <button @click="deletePostById(post.id)">Delete Post</button>
                        <button @click="openEditModal(post)">Edit Post</button>
                    </div>
            </div>
            </article>
        </div>
    </div>
    </div>
    <!-- Modal -->
    <div v-if="isEditModalOpen" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h1 class="title">Edit Post</h1>
                <div class="field">
                    <label class="label">Caption</label>
                    <div class="control">
                        <input class="input" type="text" v-model="ePostCaption" placeholder="Caption">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Image URL</label>
                    <div class="control">
                        <input class="input" type="text" v-model="ePostImageURL" placeholder="Image URL">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <input class="input" type="text" v-model="ePostLocation" placeholder="Location">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Distance</label>
                    <div class="control">
                        <input class="input" type="number" v-model="ePostDistance" placeholder="Distance">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Duration</label>
                    <div class="control">
                        <input class="input" type="number" v-model="ePostDuration" placeholder="Duration">
                    </div>
                </div>
            </div>
            <button class="button is-success"
                @click="saveEditedPost(ePostCaption, ePostImageURL, ePostLocation, ePostDistance, ePostDuration)">Save
                changes</button>

        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeEditModal()"></button>
    </div></template>

<style scoped></style>
