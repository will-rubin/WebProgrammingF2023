<script setup lang="ts">
import ExerciseFeed from '@/components/ExerciseFeed.vue';
import { getSession } from '@/model/session';
const session = getSession();
</script>

<template>
    <div class="box" v-if="session.user">
    <h1>User: {{ session.user?.firstName }}</h1>
  </div>

  <div class="box" v-else="!session.user">
    <h1>Not logged in! Log in to see your exercises</h1>
  </div>

  <div>
    <ExerciseFeed />
  </div>
</template>

<style scoped>

</style>