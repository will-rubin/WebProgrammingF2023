<!--want this to be a filterable feed of media objects -->

<script setup lang="ts">
import { getSession, getCurrentUser } from '@/model/session';
import { type Post, getAllPosts, getPost, deletePost, createPost, updatePost } from '@/model/posts';
import { ref } from 'vue';

// const user = ref(getCurrentUser());

// const email = user.value?.email;

// const posts = ref([] as Post[]);
// await getAllPosts().then((data) => {
//     posts.value = data;
// })

// const id = ref(9);
// const currentAuthor = email;
// const fullName = user.value?.fullName;
// const timestamp = ref("00:00:00");
// const location = ref("Location");
// const caption = ref("Caption");
// const imageURL = ref("ImageURL");
// const distance = ref(0.0);
// const duration = ref(0.0);


// //this is very bad, we insead need to get the max id from the database itself, 
// //This violates MVC principles
// function incrementId() {
//     id.value++;
// }

// const selectedPostID = ref(0);
// const selectedPost = ref(getPosts()[selectedPostID.value]);
</script>

<template>
    <!-- <div class="columns">
        <div class="column is-one-quarter"> <!-- exercise adder-->
            <div class="box">
                <label class="label has-text-centered">Exercise Adder</label>
                <div class="field">
                    <label class="label">Timestamp</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="00:00:00" v-model="timestamp">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Location" v-model="location">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Caption</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Caption" v-model="caption">
                    </div>
                </div>
                <div class="field">
                    <label class="label">ImageURL</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="ImageURL" v-model="imageURL">
                        </div>
                </div>
                <div class="field">
                    <label class="label">Distance</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="0.0 mi" v-model="distance">
                        </div>
                </div>
                <div class="field">
                    <label class="label">Duration</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="00:00:00" v-model="duration">
                        </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="is-link" @click="incrementId(), addPost(id, timestamp, location, caption, imageURL, distance, duration, currentAuthor, fname, lname)">Add Post</button>
                    </div>
                </div>
            </div>
            <div class="box">
                <label class="label has-text-centered">Exercise Editor</label>
                <div class="panel-block">
                        <label class="label">Select Post</label>
                        <div class="select">
                            <select v-model="selectedPostID">
                                <option v-for="post in getPostsByEmail(user?.email)" :key="post.id">{{ post.id }}</option>
                            </select>
                        </div>
                    </div>
                <div class="field">
                    <label class="label">Timestamp</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="00:00:00" v-model="timestamp">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Location" v-model="location">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Caption</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Caption" v-model="caption">
                    </div>
                </div>
                <div class="field">
                    <label class="label">ImageURL</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="ImageURL" v-model="imageURL">
                        </div>
                </div>
                <div class="field">
                    <label class="label">Distance</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="0.0 mi" v-model="distance">
                        </div>
                </div>
                <div class="field">
                    <label class="label">Duration</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="00:00:00" v-model="duration">
                        </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="is-link" @click="editPost(selectedPost, timestamp, location, caption, imageURL, distance, duration)">Edit Post</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="column"> <!-- exercise feed-->
            <div class="panel">
                <p class="panel-heading">Your Posts</p>
                <div class="panel-block" v-for="post in posts" :key="post.id">
                    <article class="media-content" v-if="post.author === user?.email">
                        <div class="media-content">
                            <div class="content">
                                <button class="button is-danger is-small" @click="deletePost(post)">Delete Post</button>
                                <p> Post ID: {{ post.id }}</p>
                                <p>
                                    <strong>{{ post.fname }} {{ post.lname }}</strong> <small>{{ post.author }}</small>
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
                            </div>    
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div> -->
</template>



<style scoped>

</style>