<template>
  <center-wrapper>
    <ul class="list">
      <video-list-item v-for="video in state.list" :key="video.video" :video="video" />
    </ul>
  </center-wrapper>
</template>

<script>
import VideoListItem from '@/components/VideoListItem.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'
import useVideos from '@/use/videos'

export default {
  setup() {
    const { state } = useVideos()
    return { state }
  },
  components: {
    VideoListItem,
    CenterWrapper,
  },
}
</script>

<style scoped lang="postcss">
.list {
  @mixin list-reset;

  display: grid;
  grid-gap: 0.75em 1em;
  margin-top: 1em;

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  }
}
</style>
