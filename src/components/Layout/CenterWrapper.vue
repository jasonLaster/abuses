<template>
  <div class="notch" :class="{ top }">
    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss" scoped>
.notch {
  padding-left: var(--notch-left);
  padding-right: var(--notch-right);

  &.top {
    padding-top: var(--notch-top);
  }
}

.wrapper {
  max-width: var(--container-width-xlg);
  width: 100%;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  margin: 0 auto;
}
</style>
