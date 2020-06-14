<template>
  <transition name="slide-in" @after-enter="afterEnter" @before-leave="beforeLeave">
    <slot />
  </transition>
</template>

<script>
export default {
  methods: {
    afterEnter(el) {
      this.$emit('after-enter', el)
    },
    beforeLeave(el) {
      this.$emit('before-leave', el)
    },
  },
}
</script>

<style lang="postcss" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.2s;
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translateY(-0.5em);
}
</style>
