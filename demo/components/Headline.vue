<template>
  <component :is="elm">
    <span v-if="anchor">
      <a
        :id="anchor"
        :href="`${url}#${anchor}`"
      >#</a>&nbsp;
    </span>
    <!-- @slot headline content -->
    <slot />
  </component>
</template>

<nsg-states>
export { Headline as default } from './states'
</nsg-states>

<script>
/**
 * ### Meta Warning!
 *
 * This component is used in the documentation you are just reading.
 * It is not part of the re-usable packages and mainly exits for demonstration purposes.
 */
export default {
  name: 'Headline',
  props: {
    /**
     * Level of the headline (1-6)
     * Default: `2`
     */
    level: {
      type: [Number, String],
      default: 2,
    },
    /**
     * Anchor of the headline
     */
    anchor: { type: String, default: null },
  },
  computed: {
    url() {
      return `${this.$router.history.base}${this.$route.path}/`
    },
    elm() {
      return `h${this.level}`
    },
  },
}
</script>
