<template>
  <li class="item" @mousedown.left="mouseDown" @mouseup.left="mouseUp">
    <div class="text">
      <router-link
        ref="link"
        class="link"
        :to="{
          path: `incident/${incident.youtube}`,
          append: true,
        }"
      >
        <span class="title">{{ getIncidentTitle(incident) }}</span>
        {{ incident.text }}
      </router-link>
    </div>
    <div class="image-wrapper">
      <img
        :src="`https://img.youtube.com/vi/${incident.youtube}/hqdefault.jpg`"
        width="480"
        height="360"
        loading="lazy"
        alt
        class="image"
      />
      <svg
        width="1792"
        height="1792"
        class="icon"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1576 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z"
        />
      </svg>
    </div>
  </li>
</template>

<script>
import useIncidents from '@/use/incidents'

function isChildOf(child, parent) {
  if (child === parent) {
    return true
  }

  if (child.parentElement == null) {
    return false
  }

  return isChildOf(child.parentElement, parent)
}

export default {
  setup() {
    const { getIncidentTitle } = useIncidents()
    return { getIncidentTitle }
  },
  props: {
    incident: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      down: null,
    }
  },

  methods: {
    mouseUp(event) {
      if (isChildOf(event.target, this.$refs.link.$el)) return

      const up = +new Date()
      if (up - this.down < 200) {
        this.showIncidentDetails()
      }
    },
    mouseDown() {
      this.down = +new Date()
    },
    showIncidentDetails() {
      this.$router.push({
        path: `incident/${this.incident.youtube}`,
        append: true,
      })
    },
  },
}
</script>

<style scoped lang="postcss">
.item {
  cursor: pointer;
  border-bottom: 1px solid var(--color-primary);
  padding-bottom: 0.75em;
  display: flex;
  flex-direction: row;

  &:focus,
  &:hover {
    & .title {
      text-decoration: underline;
    }
  }
}

.image-wrapper {
  order: -1;
  flex: 0 0 10em;
  margin-right: 0.75em;
  position: relative;
  align-self: flex-start;
  display: none;

  @media (--viewport-xs) {
    display: block;
  }
}

.image {
  width: 100%;
  display: block;
  height: auto;
}

.link {
  @mixin link-reset;

  padding: 0.25em 0 0.5em;
}

.title {
  display: block;
  color: var(--color-primary);
  text-transform: uppercase;
}

.icon {
  width: 3em;
  height: 3em;
  fill: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -1.5em 0 0 -1.5em;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
