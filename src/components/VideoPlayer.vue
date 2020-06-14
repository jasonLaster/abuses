<template>
  <app-modal :show="hasVideo" :large="true" :title="title" @close="closeModal">
    <div v-if="video">
      <div class="video-container">
        <youtube
          ref="youtube"
          class="player"
          :width="560"
          :height="315"
          :video-id="video.youtube"
          :player-vars="playerVars"
        />
      </div>
      <p class="text">{{ video.text }}</p>

      <div class="buttons">
        <a ref="tweet" class="btn" :href="video.tweet" rel="noopener" target="_blank">
          View original tweet
        </a>
      </div>
    </div>
  </app-modal>
</template>

<script>
import AppModal from '@/components/AppModal.vue'

export default {
  components: {
    AppModal,
  },
  props: {
    video: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      playerVars: {
        rel: 0,
        playsinline: 1,
      },
      isPlayingVideo: false,
    }
  },
  computed: {
    title() {
      if (this.hasVideo) {
        return `Incident #${this.video.id} — ${this.video.city}, ${this.video.state}`
      }
      return ''
    },
    hasVideo() {
      return this.video !== null
    },
  },
  watch: {
    video(value) {
      if (!value) return
      this.$nextTick(() => {
        const { player } = this.$refs.youtube
        player.playVideo()
      })
    },
  },

  methods: {
    closeModal() {
      this.$router.push({
        name: 'VideoDetails',
      })
    },
  },
}
</script>

<style scoped lang="postcss">
.buttons {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-bottom: 0.5em;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  margin-bottom: var(--spacing-s);
}

>>> iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
