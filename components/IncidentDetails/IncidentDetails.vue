<template>
  <div class="details">
    <article>
      <h1>Incident #{{ incident.id }}</h1>
      <div class="location">{{ incident.city }}, {{ incident.state }}</div>
      <h2>Description</h2>
      <p>{{ incident.text }}</p>
    </article>
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
    <div class="links">
      <a :href="incident.tweet" rel="noopener" target="_blank">
        View original tweet
      </a>
      |
      <a
        :href="`https://www.youtube.com/watch?v=${incident.youtube}`"
        rel="noopener"
        target="_blank"
      >
        Video URL
      </a>
    </div>
  </div>
</template>

<script>
export default {
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
}
</script>

<style scoped lang="postcss">
.buttons {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-bottom: 0.5em;
}

.location {
  margin-bottom: 0.5em;
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

.details {
  margin-bottom: 2em;
}
</style>
