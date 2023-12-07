<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginBadge from './LoginBadge.vue';

const isActive = ref(false)
</script>

<template>
    <aside class="menu">
        
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
            <li>
                <router-link to="/admin" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-sitemap"></i>
                        </span>
                        <span>Admin</span>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link to="/myExercises" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-running"></i>
                        </span>
                        <span>My Exercises</span>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link to="/stats" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-user-clock"></i>
                        </span>
                        <span>My Statistics</span>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link to="/friends" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-user-friends"></i>
                        </span>
                        <span>Friend's Exercises</span>
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

    li {
        padding: 5px;
    }


</style>