<script setup lang="ts">
import { computed, ref } from 'vue';
import { getSession } from '@/model/session';
import { type Post, getAllPosts } from '@/model/posts';

const posts = ref([] as Post[])
getAllPosts().then((data) => {
    posts.value = data;
}) 

const distanceTotal = computed(() => {
    let total = 0;
    for (let i = 0; i < posts.value.length; i++) {
        if(posts.value[i].author == getSession().user?.email) {
            total += posts.value[i].distance;
        }
    }
    return total;
});

const durationTotal = computed(() => {
    let total = 0;
    for (let i = 0; i < posts.value.length; i++) {
        if(posts.value[i].author == getSession().user?.email) {
            total += posts.value[i].duration;
        }
    }
    return total/60;
});

const averagePace = computed(() => {
    return distanceTotal.value / durationTotal.value;
});

const caloriesBurnt = computed(() => {
    return durationTotal.value * 350;
});

</script>

<template>
    <div class="box">
        <h1 class="title">
            Statistics computed from your posts
        </h1>
    </div>
    <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
            <article class="tile is-child box">
                <p class="title">Total Distance</p>
                <p class="subtitle">{{ distanceTotal }} miles</p>
            </article>
            <article class="tile is-child box">
                <p class="title">Total Duration</p>
                <p class="subtitle">{{ durationTotal }} hours</p>
            </article>
        </div>
        <div class="tile is-parent is-vertical">
            <article class="tile is-child box">
                <p class="title">Average Pace</p>
                <p class="subtitle">{{ averagePace }} miles/hour</p>
            </article>
            <article class="tile is-child box">
                <p class="title">Calories Burnt</p>
                <p class="subtitle">{{ caloriesBurnt }} cals</p>
            </article>
        </div>
    </div>
</template>



<style scoped>

</style>