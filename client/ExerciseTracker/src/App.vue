<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="columns">
    
    <div class="column is-one-fifth">
      <Sidebar />
    </div>
    <div class="column">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
body { 
  background-color: blue;
}
</style>
