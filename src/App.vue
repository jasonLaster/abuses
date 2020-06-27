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
      popStateDetected: false,
    }
  },
  watch: {
    // watch the `$route` to determine the transition to use
    $route(to) {
      // only animate by app navigation
      if (!this.popStateDetected) {
        const isListPage = to.name === 'Root' || to.name === 'City'
        this.direction = isListPage ? 'left' : 'right'
      } else {
        this.direction = 'none'
      }
      this.popStateDetected = false
    },
  },
  mounted() {
    // detect if user is using a back/forward button from the browser
    window.addEventListener('popstate', () => {
      this.popStateDetected = true
    })
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
  padding: 2em 0 4em;
  flex: 1 1 auto;
  background: var(--color-white);
}
</style>
