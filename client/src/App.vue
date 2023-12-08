<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getSession } from './model/session'

import Sidebar from './components/Sidebar.vue'

const session = getSession()


</script>

<template>
  <div class="columns">
    
    <div class="column is-one-fifth">
      <Suspense>
        <Sidebar />
      </Suspense>
    </div>
    <div class="column">
      <progress class="progress is-small is-primary is-striped" max="100" v-if="session.loading">15%</progress>
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>

</style>
