<script setup lang="ts">
import { type Post, getAllPosts } from '@/model/posts';
import { getUserFromEmail } from '@/model/users';
import { ref } from 'vue';

const posts = ref([] as Post[])

await getAllPosts().then((data) => {
  posts.value = data;
})


</script>

<template>
  <div class="box">
    <h1 class="title">Welcome to the Exercise Tracker!</h1>
  </div>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-four-fifths"> <!-- exercise feed-->
      <div class="panel">
        <p class="panel-heading has-text-centered">All Posts</p>
        <div class="panel-block" v-for="post in posts" :key="post.id">
          <article class="media-content">
            <div class="media-content">
              <div class="content">
                <div class="card">

                  <div class="card-image">
                    <figure class="image">
                      <img :src="post.imageURL" alt="Post image">
                    </figure>
                  </div>

                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">

                      </div>
                      <div class="media-content">
                        <p class="title is-4">{{ post.fullName }}</p>
                        <p class="subtitle is-6">{{ post.author }}</p>
                      </div>
                    </div>
                    
                    <nav class="level">
                      <div class="level-left">
                        <div class="level-item">
                          <div class="content">{{ post.caption }}</div>
                        </div>
                      </div>
                      <div class="level-right">
                        <div class="level-item has-text-centered">
                          <p class="heading">Distance</p>
                          <p class="title">{{ post.distance }} <small>miles</small></p>
                        </div>
                        <div class="level-item has-text-centered">
                          <p class="heading">Duration</p>
                          <p class="title">{{ post.duration }} <small>minutes</small></p>
                        </div>
                      </div>
                    </nav>

                    <footer class="card-footer">
                      <div class="field is-grouped is-grouped-multiline">
                        <div class="control">
                          <div class="tags has-addons">
                            <span class="tag">time</span>
                            <span class="tag is-info is-light">{{ post.timestamp }}</span>
                          </div>
                        </div>

                        <div class="control">
                          <div class="tags has-addons">
                            <span class="tag">location</span>
                            <span class="tag is-info is-light">{{ post.location }}</span>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  background-color: #b7e6ea;
  padding: 20px;
  margin-top: 20px;
}

icon-text {
  margin-left: 10px;
}

.column {
  margin-right: 15px;
}
</style>