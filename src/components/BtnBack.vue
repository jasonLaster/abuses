<template>
  <div :class="$style.wrapper">
    <router-link :to="to" :class="$style.link">
      <svg
        :class="$style.icon"
        width="16"
        height="16"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
        />
      </svg>

      {{ title }}</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style module lang="postcss">
.wrapper {
  margin-bottom: 0.5em;
}

.icon {
  position: absolute;
  left: -1em;
  top: 0.25em;
  transition: ease-out 0.1s transform;
}

.link {
  margin-left: 1em;
  position: relative;

  &:hover,
  &:focus {
    & .icon {
      transform: translateX(-0.25em);
    }
  }
}
</style>
