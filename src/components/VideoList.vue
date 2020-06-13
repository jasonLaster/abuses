<template>
  <center-wrapper>
    <ul class="list">
      <video-list-item
        v-for="video in videos"
        :key="video.video"
        :video="video"
        :current-video-id="currentVideoId"
      />
    </ul>
  </center-wrapper>
</template>

<script>
import VideoListItem from '@/components/VideoListItem.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'

export default {
  components: {
    VideoListItem,
    CenterWrapper,
  },
  props: {
    videos: {
      type: Array,
      required: true,
    },
    currentVideoId: {
      type: String,
      required: true,
    },
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
    grid-template-columns: repeat(auto-fit, minmax(22em, 1fr));
  }
}
</style>
