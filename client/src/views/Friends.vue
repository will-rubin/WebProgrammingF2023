<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';
import { type Post, getAllPosts } from '@/model/posts';

const user = getSession().user;

const posts = ref<Post[]>([]);
await getAllPosts().then((data) => {
  posts.value = data;
});

const friendsList = ref<string[]>([]);
</script>

<template>
  <div class="column"> <!-- exercise feed-->
    <div class="panel">
        <p class="panel-heading has-text-centered">
            <h1 class="title">Your Friends' Posts</h1>
            <div class="box">
                <div class="field">
                    <label class="label">Search for Friends</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Search for friends" v-model="search">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Friends List</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option v-for="friend in friendsList" :key="friend.id">{{ friend }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </p>
        <div class="panel-block" v-for="post in posts" :key="post.id">
            <article class="media-content" v-if="post.author != user?.email">
                <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{{ post.fullName }}</strong> <small>{{ post.author }}</small>
                    <br>
                    {{ post.caption }}
                    <br>
                    </p>
                <div>
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
            </div>
            </article>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>