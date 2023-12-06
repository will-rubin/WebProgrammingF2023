<script setup lang="ts">
import { getSession } from '@/model/session';
import { type Post, getAllPosts} from '@/model/posts';
import { ref } from 'vue';

const posts = ref([] as Post[])

await getAllPosts().then((data) => {
  posts.value = data;
})

const session = getSession();

</script>

<template>
  <div class="box">
    <h1 class="title">Welcome to the Exercise Tracker!</h1>
  </div>
  <div class="column"> <!-- exercise feed-->
    <div class="panel">
      <p class="panel-heading has-text-centered">All Posts</p>
        <div class="panel-block" v-for="post in posts" :key="post.id">
          <article class="media-content">
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