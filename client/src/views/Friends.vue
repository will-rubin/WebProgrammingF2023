<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';
import { type Post, getAllPosts } from '@/model/posts';

const user = getSession().user;

const posts = ref<Post[]>([]);
getAllPosts().then((data) => {
  posts.value = data;
});
</script>

<template>
  <div class="column"> <!-- exercise feed-->
    <div class="panel">
        <p class="panel-heading has-text-centered">
            <h1 class="title">Your Friends' Posts</h1>
            <h1 class="subtitle">Sign in to see everyone's posts but yours</h1>
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