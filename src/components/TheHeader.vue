<template>
  <header>
    <center-wrapper>
      <h1>Police Abuses</h1>
      <p>{{ totalVideos }} Videos of Police Brutality From George Floyd Protests</p>
    </center-wrapper>
  </header>
</template>

<script>
import videos from '@/data/videos.json'
import CenterWrapper from '@/components/CenterWrapper.vue'

export default {
  components: {
    CenterWrapper,
  },
  computed: {
    totalVideos() {
      const totalVideos = videos.list.filter((video) => video.youtube.length)
      return totalVideos.length
    },
  },
}
</script>

<style scoped lang="postcss">
header {
  @mixin color-negative;

  text-align: center;
  padding: 1.5em 0;
}

p {
  margin: 0;
}

a {
  display: inline-block;
  margin: 0 0.25em;
}
</style>
