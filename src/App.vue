<template>
  <div id="app" :class="$style.page">
    <the-header />
    <main :class="$style.main">
      <router-animation :direction="direction">
        <router-view />
      </router-animation>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import RouterAnimation from '@/components/Animations/RouterAnimation.vue'

export default {
  name: 'App',
  components: {
    RouterAnimation,
    TheHeader,
  },
  data() {
    return {
      direction: '',
    }
  },
  watch: {
    // watch the `$route` to determine the transition to use
    $route(to) {
      const isListPage = to.name === 'Root' || to.name === 'City'
      this.direction = isListPage ? 'left' : 'right'
    },
  },
}
</script>

<style>
@import './styles/base.css';
</style>

<style module lang="postcss">
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  padding-top: 2em;
  flex: 1 1 auto;
  background: var(--color-white);
  overflow-x: hidden;
}
</style>
