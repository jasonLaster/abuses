<template>
  <center-wrapper>
    <h2>Invalid {{ noun }}</h2>
    <p>Uh-oh, this {{ noun }} does not exist.</p>
    <nuxt-link to="/">Return home</nuxt-link>
  </center-wrapper>
</template>

<script>
import CenterWrapper from '@/components/Layout/CenterWrapper.vue'

export default {
  components: { CenterWrapper },
  props: { noun: { type: String, default: 'URL' } },
}
</script>
