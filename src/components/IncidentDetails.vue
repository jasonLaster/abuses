<template>
  <app-modal
    :show="incident !== null"
    :large="true"
    :title="getIncidentTitle(incident)"
    @close="closeModal"
  >
    <div v-if="incident">
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
    </div>
  </app-modal>
</template>

<script>
import AppModal from '@/components/AppModal.vue'
import useIncidents from '@/use/incidents'

export default {
  setup() {
    const { getIncidentTitle, getIncidentByID } = useIncidents()
    return { getIncidentTitle, getIncidentByID }
  },
  components: {
    AppModal,
  },
  data() {
    return {
      playerVars: {
        rel: 0,
        playsinline: 1,
      },
    }
  },

  computed: {
    incident() {
      const { id } = this.$route.params
      return this.getIncidentByID(id)
    },
  },
  methods: {
    closeModal() {
      this.$router.push({
        name: 'IncidentDetails',
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
