<template>
  <div v-if="incident">
    <center-wrapper>
      <div class="video-container">
        <youtube
          ref="youtube"
          class="player"
          :width="560"
          :height="315"
          :video-id="incident.youtube"
          :player-vars="playerVars"
        />
      </div>
      <p class="text">{{ incident.text }}</p>

      <div class="buttons">
        <a ref="tweet" class="btn" :href="incident.tweet" rel="noopener" target="_blank">
          View original tweet
        </a>
      </div>
    </center-wrapper>
  </div>
</template>

<script>
import useIncidents from '@/use/incidents'
import CenterWrapper from '@/components/CenterWrapper.vue'

export default {
  setup() {
    const { getIncidentTitle } = useIncidents()
    return { getIncidentTitle }
  },

  components: {
    CenterWrapper,
  },

  props: {
    incident: {
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
    }
  },
  methods: {
    closeModal() {
      if (!Object.keys(this.$route.params).includes('city')) {
        this.$router.push({ name: 'Root' })
        return
      }

      const { city } = this.$route.params
      this.$router.push({ name: 'City', params: { city } })
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

.icon {
  width: 5em;
  height: 5em;
  fill: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -2.5em 0 0 -2.5em;
}
</style>
