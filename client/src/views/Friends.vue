<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '@/model/session';
import { type Post, getAllPosts } from '@/model/posts';
import { type User, searchUsers } from '@/model/users';


const user = getSession().user;
const posts = ref<Post[]>([]);
const friendsList = ref(user?.friends ?? []);
await getAllPosts().then((data) => {
    posts.value = data.filter(post => friendsList.value.includes(post.author));
});

const searchText = ref("");
const results = ref<User[]>([]);
async function getMyOtherData(query: string) {
    if(query == "") {
        results.value = [];
        return;
    }
    await searchUsers(query)
    .then((data) => {
        results.value = data;
    })
    .catch((err) => {
        console.error(err);
    });
}
</script>

<template>
    <div class="columns">
        <div class="column is-one-quarter">
            <div class="panel">
                <p class="panel-heading has-text-centered">
                    <section>
                        <div class="box">
                            <h1 class="title">Search for Friends</h1>
                            <input class="input" type="text" placeholder="Friend's email" v-model="searchText" @input="getMyOtherData(searchText)" >
                        </div>
                        <div class="panel-block" v-for="result in results">
                            <article class="media-content">
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>{{ result.fullName }}</strong> <small>{{ result.email }}</small>
                                            <br> 
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </p>
            </div>
        </div>
        <div class="column is-three-quarters">
                <p class="panel-heading has-text-centered">
                    <h1 class="title">Your Friends' Posts</h1>
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


<style scoped></style>


