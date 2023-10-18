<script setup lang="ts">

</script>

<template>
  <h1 class="title">Welcome to Exercise Tracker</h1>
  <h1 class="subtitle">This is a simple app to track your exercises</h1>
  <div class="columns">
    <div class="column">
      <nav class="panel">
        <p class="panel-heading has-text-centered">
          Exercise Feed
        </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search">
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p class="panel-tabs">
          <router-link to="/exercises" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-book"></i>
                        </span>
                        <span>My Exercises</span>
                    </span>
          </router-link>
          <router-link to="/exercises" exact>
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-book"></i>
                        </span>
                        <span>Friends' Exercises</span>
                    </span>
          </router-link>
        </p>
        <div class="panel-block">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    text-align: center;
    background-color: #b7e6ea;
    padding: 20px;
    margin-top: 20px;
  }
</style>
```
