<script setup lang="ts">
import { getSession } from '@/model/session';
const session = getSession();

</script>

<template>
  
  <div class="box">
    <h1>User: {{ session.user?.firstName }}</h1>
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
```
