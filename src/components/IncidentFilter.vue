<template>
  <div :class="$style.filter">
    <select :class="$style['filter-select']" @input="input">
      <option :value="null" selected>FILTER BY LOCATION</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String,
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style module lang="postcss">
.filter {
  z-index: var(--z-header);

  position: fixed;
  /**
   * TODO(dmnd): These values for top are extremely coupled to the
   * implementation of the header, so the filter should probably move to the
   * header even though that's a little odd from a data flow perspective.
   */
  top: 90px;
  @media (--viewport-xs) {
    top: 95px;
  }
  @media (--viewport-sm) {
    top: 110px;
  }
}

.filter > select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0.75em 4em 0.75em 1.5em;
  color: var(--color-primary);
  border-color: var(--color-primary);
  border-radius: 3px;
  border-width: 1px;
  background: #fff
    url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='20' height='20' xmlns='http://www.w3.org/2000/svg'><g><path stroke='black' stroke-width='4' d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'/></g></svg>")
    no-repeat;
  background-position: right 10px top 50%;
}
</style>
