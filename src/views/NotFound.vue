<template>
  <center-wrapper>
    <h2>Invalid URL</h2>
    <p>Uh-oh, this URL does not exist.</p>
    <router-link to="/">Return home</router-link>
  </center-wrapper>
</template>

<script>
import CenterWrapper from '@/components/CenterWrapper.vue'

export default { components: { CenterWrapper } }
</script>
