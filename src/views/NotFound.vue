<template>
  <center-wrapper>
    <h2>Invalid {{ noun }}</h2>
    <p>Uh-oh, this {{ noun }} does not exist.</p>
    <router-link to="/">Return home</router-link>
  </center-wrapper>
</template>

<script>
import CenterWrapper from '@/components/CenterWrapper.vue'

export default {
  components: { CenterWrapper },
  props: { noun: { type: String, default: 'URL' } },
}
</script>
