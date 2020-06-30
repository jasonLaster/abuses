<template>
  <li class="item" @mousedown.left="mouseDown" @mouseup.left="mouseUp">
    <div class="content">
      <router-link
        ref="link"
        class="link"
        :to="{
          name: 'IncidentDetails',
          params: {
            id: incident.youtube,
          },
        }"
      >
        <span class="title"> Incident #{{ incident.id }}</span>
        <span class="location">{{ incident.city }}, {{ incident.state }}</span>
      </router-link>
      <div class="text">
        {{ incident.text }}
      </div>
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
        name: 'IncidentDetails',
        params: {
          id: this.incident.youtube,
        },
      })
    },
  },
}
</script>

<style scoped lang="postcss">
.item {
  transition: border-color 0.2s ease-out;
  cursor: pointer;
  border: 1px solid var(--color-gray);
  display: flex;
  flex-direction: column;
  border-radius: 0.25em;

  &:focus-within,
  &:hover {
    border-color: var(--color-black);
    & .title {
      text-decoration: underline;
    }
  }
}

.content {
  overflow-x: hidden;
  padding: var(--spacing-xs);
}

.image-wrapper {
  order: -1;
  position: relative;
  align-self: flex-start;
}

.image {
  border-radius: 0.25em 0.25em 0 0;
  width: 100%;
  display: block;
  height: auto;
}

.link {
  @mixin link-reset;

  display: block;
  margin-bottom: var(--spacing-xs);
}

.location,
.title {
  display: block;
  text-transform: uppercase;
}

.location,
.text {
  font-size: 0.85em;
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
</style>
