<script setup lang="ts">
import { ref, computed } from 'vue';
import { getSession } from '@/model/session';
import { type Post, getAllPosts } from '@/model/posts';
import { type User, getUsers, searchUsers } from '@/model/users';


const user = getSession().user;
const posts = ref<Post[]>([]);
const friendsList = ref(user?.friends ?? []);
await getAllPosts().then((data) => {
    posts.value = data.filter(post => friendsList.value.includes(post.author));
});

const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const data = ref<User[]>([]);
const selected = ref<User | null>(null);
const name = ref("");

async function getMyData(query: string) {
    const _data = await searchUsers(query);
    data.value = _data;

}

async function getAsyncData(_name: string) {
    if (name.value !== _name) {
        name.value = _name;
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
    }

    // String cleared
    if (!_name.length) {
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
        return;
    }

    // Reached last page
    if (page.value > totalPages.value) {
        return;
    }

    isFetching.value = true;
    try {
        const _data = await searchUsers(_name) as User[];
        
        data.value = [...(data.value ?? []), ..._data];
        page.value += 1;
        totalPages.value = 1;
    } catch (err) {
        console.error(err);
    } finally {
        isFetching.value = false;
    }
}

function getMoreAsyncData() {
    getAsyncData(name.value);
}
</script>

<template>
    <div class="column">
        <div class="panel">
            <p class="panel-heading has-text-centered">
            <h1 class="title">Your Friends' Posts</h1>


            <section>
                <o-field label="Find a user">
                    <o-autocomplete :data="data" placeholder="e.g. john" field="email" :loading="isFetching"
                        check-scroll open-on-focus :debounce="500" @input="getMyData"
                        @select="(option: User) => (selected = option)">
                        <template #default="props">
                            <div class="media">
                                <div class="media-left">
                                    <img width="32" :src="props.option" />
                                </div>
                                <div class="media-content">
                                    
                                </div>
                            </div>
                        </template>
                        
                    </o-autocomplete>
                </o-field>
                <p><b>Selected:</b> {{ selected }}</p>
            </section>


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


