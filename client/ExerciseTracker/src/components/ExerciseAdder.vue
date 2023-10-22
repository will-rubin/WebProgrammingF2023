<script setup lang="ts">
import { type ExercisePost, getPosts, addPost } from '@/model/exercisePosts';
import { getSession } from '@/model/session';
import { ref } from 'vue';

const posts = ref(getPosts());

const user = getSession().user;

const id = ref(9);
const currentAuthor = user?.email;
const timestamp = ref("00:00:00");
const location = ref("Location");
const caption = ref("Caption");
const imageURL = ref("ImageURL");
const distance = ref("0.0 mi");
const duration = ref("Duration");



</script>

<template>
<div class="box">
    <label class="label">Exercise Adder</label>
    <div class="field">
        <label class="label">Timestamp</label>
        <div class="control">
            <input class="input" type="text" placeholder="00:00:00">
        </div>
    </div>
    <div class="field">
        <label class="label">Location</label>
        <div class="control">
            <input class="input" type="text" placeholder="Location">
        </div>
    </div>
    <div class="field">
        <label class="label">Caption</label>
        <div class="control">
            <input class="input" type="text" placeholder="Caption">
        </div>
    </div>
    <div class="field">
        <label class="label">ImageURL</label>
            <div class="control">
                <input class="input" type="text" placeholder="ImageURL">
            </div>
    </div>
    <div class="field">
        <label class="label">Distance</label>
            <div class="control">
                <input class="input" type="text" placeholder="0.0 mi">
            </div>
    </div>
    <div class="field">
        <label class="label">Duration</label>
            <div class="control">
                <input class="input" type="text" placeholder="00:00:00">
            </div>
    </div>
</div>

</template>

<style scoped>

</style>