<template>
  <div class="wrapper">
    <video-player />
    <video-list />
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'
import VideoList from '@/components/VideoList.vue'

export default {
  components: {
    VideoPlayer,
    VideoList,
  },
}
</script>
