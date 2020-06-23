<template>
  <transition :name="transitionName" class="pink">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      required: true,
    },
  },
  computed: {
    transitionName() {
      return `slide-${this.direction}`
    },
  },
}
</script>

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
  overflow-x: hidden;
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
