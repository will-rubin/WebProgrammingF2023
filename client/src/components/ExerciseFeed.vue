<script setup lang="ts">
import { type Post, getAllPosts, filterPostsByUser, createPost, updatePost, deletePost } from '@/model/posts';
import { getCurrentUserEmail } from '@/model/session';
import { ref } from 'vue';

const posts = ref([] as Post[])
const selectedPost = ref(null as Post | null)
const isModalOpen = ref(false)

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
    isModalOpen.value = true
}

const closeEditModal = () => {
    selectedPost.value = null
    isModalOpen.value = false
}

const ePostCaption = ref(selectedPost.value?.caption || "") 
const ePostImageURL = ref(selectedPost.value?.imageURL || "")
const ePostLocation = ref(selectedPost.value?.location || "")
const ePostDistance = ref(selectedPost.value?.distance || 0)
const ePostDuration = ref(selectedPost.value?.duration || 0)


const saveEditedPost = async (ePostCaption, ePostImageURL, ePostLocation, ePostDistance, ePostDuration) => {
    const editedPost = {
        ...selectedPost.value,
        caption: ePostCaption.value,
        imageURL: ePostImageURL.value,
        location: ePostLocation.value,
        distance: ePostDistance.value,
        duration: ePostDuration.value
    }

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
                            <p>
                                <strong>{{ post.fullName }}</strong> <small>{{ post.author }}</small>
                                <br>
                                {{ post.caption }}
                                <br>
                            </p>
                            <div class="level">
                                <div class="level-item">
                                    <div class="media-content">
                                        <p class="image">
                                            <img :src="post.imageURL" style="max-width: 300px; width: 100%">
                                        </p>
                                    </div>
                                </div>
                                <div class="level-item">
                                    <h2 class="title">Distance: {{ post.distance }} miles</h2>
                                </div>
                                <div class="level-item">
                                    <h2 class="title">Duration: {{ post.duration }} minutes</h2>
                                </div>
                            </div>
                            <p>
                                <small>{{ post.location }} </small>
                                <br>
                                <small>{{ post.timestamp }}</small>
                            </p>
                            <button @click="deletePostById(post.id)">Delete Post</button>
                            <button @click="openEditModal(post)">Edit Post</button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div v-if="isModalOpen" class="modal is-active">
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
            <button class="button is-success" @click="saveEditedPost(ePostCaption, ePostImageURL, ePostLocation, ePostDistance, ePostDuration)">Save changes</button>
            
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeEditModal()"></button>
    </div>
</template>

<style scoped></style>
