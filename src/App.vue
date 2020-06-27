<template>
  <div id="app" class="page">
    <the-header />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
  },
}
</script>

<style>
@import './styles/base.css';
</style>

<style lang="postcss" scoped>
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
