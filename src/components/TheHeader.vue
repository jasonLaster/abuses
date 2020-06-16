<template>
  <header>
    <center-wrapper :top="true">
      <h1>Police Abuses</h1>
      <p>{{ state.total }} Videos of Police Brutality From George Floyd Protests</p>
    </center-wrapper>
  </header>
</template>

<script>
import CenterWrapper from '@/components/CenterWrapper.vue'
import useIncidents from '@/use/incidents'

export default {
  setup() {
    const { state } = useIncidents()
    return { state }
  },

  components: {
    CenterWrapper,
  },
}
</script>

<style scoped lang="postcss">
header {
  @mixin color-negative;

  position: sticky;
  top: 0;
  text-align: center;
  padding: 1.5em 0 1em;
  z-index: var(--z-header);
  border-bottom: 1px solid var(--color-white);
}
</style>
