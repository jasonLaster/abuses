<template>
  <div :class="[$style.notch, { [$style.top]: top }]">
    <div :class="$style.wrapper">
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

<style lang="postcss" module>
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
