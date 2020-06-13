<template>
  <div class="wrapper">
    <video-player :video="currentVideo" />
    <video-list :videos="videos.list" :current-video-id="currentVideo.youtube" />
  </div>
</template>

<script>
import videos from '@/data/videos.json'
import VideoPlayer from '@/components/VideoPlayer.vue'
import VideoList from '@/components/VideoList.vue'

export default {
  components: {
    VideoPlayer,
    VideoList,
  },
  data() {
    return {
      videos,
    }
  },
  computed: {
    currentVideo() {
      const { list } = this.videos
      if (this.$route.params.id) {
        const currentVideo = list.find((video) => video.youtube === this.$route.params.id)
        if (currentVideo) {
          return currentVideo
        }
      }
      return list[0]
    },
  },
}
</script>

<style scoped lang="postcss">
.wrapper {
  @media (--landscape) and (--viewport-md) {
    grid-gap: 1em 0;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  @media (--landscape) and (--viewport-lg) {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
