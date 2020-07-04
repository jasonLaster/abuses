<template>
  <div :class="{ 'is-animating': isAnimating }">
    <transition
      :name="transitionName"
      @beforeLeave="animationStart"
      @beforeEnter="animationStart"
      @after-enter="animationEnd"
    >
      <slot />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isAnimating: false,
    }
  },
  computed: {
    transitionName() {
      return `slide-${this.direction}`
    },
  },
  methods: {
    animationStart() {
      this.isAnimating = true
    },
    animationEnd() {
      this.isAnimating = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.is-animating {
  overflow-x: hidden;
}
</style>

<style lang="postcss">
:root {
  --router-animation-duration: 0.15s;
  --router-animation-distance: 2em;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all var(--router-animation-duration);
}

.slide-left-enter-active,
.slide-right-enter-active {
  transition-delay: var(--router-animation-duration);
}

.slide-left-enter,
.slide-left-leave-active,
.slide-right-enter,
.slide-right-leave-active {
  opacity: 0;
  overflow-x: hidden;
}

.slide-right-leave-active,
.slide-left-enter {
  transform: translateX(calc(-1 * var(--router-animation-distance)));
}

.slide-left-leave-active,
.slide-right-enter {
  transform: translateX(var(--router-animation-distance));
}
</style>
