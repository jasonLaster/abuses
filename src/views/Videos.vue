<template>
  <div class="wrapper">
    <video-player :video="currentVideo" />
    <video-list :videos="videos.list" />
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
      return null
    },
  },
}
</script>
