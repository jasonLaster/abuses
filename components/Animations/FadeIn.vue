<template>
  <transition name="fade-in">
    <slot />
  </transition>
</template>

<style lang="postcss" scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.2s;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
</style>
