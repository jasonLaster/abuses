<template>
  <div id="app" :class="$style.page">
    <the-header />
    <main :class="$style.main">
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
}
</style>
