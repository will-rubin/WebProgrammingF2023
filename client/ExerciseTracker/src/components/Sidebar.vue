<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginBadge from './LoginBadge.vue';
import { getCurrentUser } from '@/model/session';

const user = getCurrentUser();
const isActive = ref(false)
</script>

<template>
    <aside class="menu">
        <p class="menu-label">
        <b>General</b>
        </p>
        <ul class="menu-list" :class="{ 'is-active': isActive}">
            <li>
                <router-link to="/" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-home"></i>
                        </span>
                        <span>Home</span>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link to="/about" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-book"></i>
                        </span>
                        <span>About</span>
                    </span>
                </router-link>
            </li>
        </ul>
    </aside>
    
    <div class="box has-text-centered">
        <LoginBadge />
    </div>
</template>

<style scoped>
    .router-link-active {
        background-color: #3273dc;
        color: white;
    }
    .menu {
        padding: 20px;
    }

</style>