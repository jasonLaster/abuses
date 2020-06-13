<template>
  <div class="video-wrapper">
    <center-wrapper>
      <p>Now Playing: Incident #{{ video.id }} — {{ video.city }}, {{ video.state }}</p>
      <youtube
        ref="youtube"
        class="player"
        :video-id="video.youtube"
        :player-vars="playerVars"
        :fit-parent="true"
        :resize-delay="10"
        :resize="true"
      />
      <p class="text">{{ video.text }}</p>

      <div class="buttons">
        <a ref="tweet" class="btn" :href="video.tweet" rel="noopener" target="_blank">
          Go to source
        </a>
      </div>
    </center-wrapper>
  </div>
</template>

<script>
import CenterWrapper from '@/components/CenterWrapper.vue'

export default {
  components: {
    CenterWrapper,
  },
  props: {
    video: {
      type: Object,
      required: true,
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

  watch: {
    video() {
      const { player } = this.$refs.youtube
      this.$nextTick(() => {
        player.playVideo()
      })
    },
  },
}
</script>

<style scoped lang="postcss">
.video-wrapper {
  @mixin color-negative;

  width: 100%;
  margin: 0;
  position: sticky;
  padding: 1em 0 0.25em;
  z-index: 9;
  top: 0;
  border-bottom: 2px solid var(--color-white);
}

.buttons {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-bottom: 0.5em;
}

.text {
  display: none;
  text-align: center;

  @media (--viewport-sm) {
    display: block;
  }
}

>>> iframe {
  width: 100%;
  margin-bottom: 0.5em;
  display: block;
  position: relative;
}
</style>
