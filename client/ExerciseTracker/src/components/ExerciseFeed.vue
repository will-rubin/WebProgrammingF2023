<!--want this to be a filterable feed of media objects -->

<script setup lang="ts">
import { getSession } from '@/model/session';
import { type ExercisePost, getPosts, } from '@/model/exercisePosts';
import { ref } from 'vue';

const posts = ref(getPosts());
const user = getSession().user;

const id = ref(9);
const currentAuthor = ref(user?.email);
const fname = ref("First Name");
const lname = ref("Last Name");
const timestamp = ref("00:00:00");
const location = ref("Location");
const caption = ref("Caption");
const imageURL = ref("ImageURL");
const distance = ref(0.0);
const duration = ref(0.0);

function addPost() {
    const newPost: ExercisePost = {
        id: id.value,
        author: currentAuthor.value,
        fname: fname.value,
        lname: lname.value,
        timestamp: timestamp.value,
        location: location.value,
        caption: caption.value,
        imageURL: imageURL.value,
        distance: distance.value,
        duration: duration.value,
    };
    posts.value.push(newPost);
    id.value++;
}
</script>

<template>
    <div class="columns">
        <div class="column is-one-quarter"> <!-- exercise adder-->
            <div class="box">
                <label class="label">Exercise Adder</label>
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
                        <button class="is-link" @click.prevent="addPost()">Add Post</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="column"> <!-- exercise feed-->
            <div class="panel is-primary">
                <p class="panel-heading">Your Posts</p>
            </div>
            <div class="panel-block" v-for="post in posts" :key="post.id">
                <article class="media-content" v-if="post.author === user?.email">
                    <div class="media-content">
                         <div class="content">
                            <p>
                                <strong>{{ post.fname }} {{ post.lname }}</strong> <small>{{ post.author }}</small>
                                <br>
                                {{ post.caption }}
                                <br>
                            </p>
                            <div class="media-content">
                                <p class="image">
                                    <img :src="post.imageURL" style="max-width: 300px; width: 100%">
                                </p>
                            </div>
                            <p>
                                <small>{{ post.timestamp }}</small>
                            </p>
                        </div>    
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>

