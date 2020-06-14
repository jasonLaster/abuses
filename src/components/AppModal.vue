<template>
  <div>
    <animation-fade-in>
      <div v-if="show" :class="$style.backdrop" />
    </animation-fade-in>
    <animation-slide-in @after-enter="afterEnter" @before-leave="beforeLeave">
      <div
        v-show="show"
        ref="modal"
        :aria-label="title"
        :class="$style.modal"
        role="dialog"
        @click.stop="closeByBackgroundClick"
        @keydown.esc="close"
      >
        <div ref="notch" :class="$style.notch">
          <article
            ref="wrapper"
            :class="[$style.wrapper, large ? $style.large : '']"
            tabindex="-1"
            role="document"
          >
            <header :class="$style.header">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <h1 :class="$style.title" v-html="title" />
              <!-- eslint-enable vue/no-v-html -->
              <button :class="$style.close" type="button" @click.stop="close">
                <span class="sr-only">Close</span>
              </button>
            </header>
            <div :class="$style.content">
              <slot />
            </div>
          </article>
        </div>
      </div>
    </animation-slide-in>
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import AnimationSlideIn from '@/components/Animations/SlideIn.vue'
import AnimationFadeIn from '@/components/Animations/FadeIn.vue'

export default {
  components: {
    AnimationSlideIn,
    AnimationFadeIn,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nodes: [],
      lastFocus: null,
    }
  },
  methods: {
    afterEnter() {
      this.lockBodyScoll(true)

      this.lastFocus = document.activeElement
      this.$refs.wrapper.focus()

      this.nodes = Array.from(document.querySelectorAll('*'))
      this.nodes.forEach((node) => {
        node.addEventListener('focus', this.restrictFocusOfNodesToModal)
      })
    },
    beforeLeave() {
      this.lockBodyScoll(false)
      this.nodes.forEach((node) => {
        node.removeEventListener('focus', this.restrictFocusOfNodesToModal)
      })

      // restore the focus to the last focusedbutton
      if (this.lastFocus) {
        this.lastFocus.focus()
      }
    },
    // keep the focus inside the modal
    restrictFocusOfNodesToModal(event) {
      const { wrapper } = this.$refs
      if (!wrapper.contains(event.target)) {
        event.stopPropagation()
        wrapper.focus()
      }
    },
    closeByBackgroundClick(event) {
      const { modal, notch } = this.$refs
      if (event.target === modal || event.target === notch) {
        this.close()
      }
    },
    close() {
      this.$emit('close')
    },
    lockBodyScoll(isOpen) {
      const { modal } = this.$refs
      if (isOpen) {
        disableBodyScroll(modal)
      } else {
        enableBodyScroll(modal)
      }
    },
  },
}
</script>

<style lang="postcss" module>
.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-modal);
}

.modal {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: var(--spacing-xs);
  z-index: var(--z-modal);
}

.notch {
  padding: var(--notch-top) var(--notch-right) 0 var(--notch-left);
}

.wrapper {
  background: var(--color-primary);
  max-width: var(--container-width-md);
  margin: 3em auto 8em;
  color: var(--color-white);
}

.large {
  max-width: var(--container-width-lg);
}

.header {
  display: flex;
  align-items: self-start;
  border-bottom: 1px solid var(--color-gray);
  padding: var(--spacing-s) var(--gutter);
}

.close {
  margin-top: var(--spacing-xxs);

  &:hover,
  &:focus {
    background: var(--color-gray-light);
  }
}

.content {
  padding: var(--spacing-s) var(--gutter) var(--gutter);
}

.title {
  flex: 1 1 auto;
  padding-right: var(--spacing-xxs);
  margin-bottom: 0;
}
</style>
