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
      <progress class="progress is-small is-primary is-striped" max="100" v-if="session.loading">15%</progress>
      <progress class="progress is-small is-primary is-striped" value="100" max="100" v-else></progress>
    </div>
    <div class="column">
      
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>

</style>
