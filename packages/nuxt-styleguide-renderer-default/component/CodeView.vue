<template>
  <div><pre><code>{{ code }}</code></pre></div>
</template>

<style>
</style>

<script>
import pretty from 'pretty'

export default {
  props: {
    comp: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasSlots() {
      return Object.keys(this.data.scopedSlots || {}).length > 0
    },
    props() {
      return Object.keys(this.data.props || {})
        .map(this.propAttr.bind(this))
        .concat(Object.keys(this.data.on || {}).map(this.onAttr.bind(this)))
        .join(' ')
    },
    code() {
      if (!this.hasSlots) {
        return pretty(`<${this.name} ${this.props} />`)
      }

      return pretty(`<${this.name} ${this.props} >
        ${this.renderSlots()}
      </${this.name}>`)
    },
  },
  methods: {
    renderSlots() {
      return Object.keys(this.data.scopedSlots)
        .map(this.renderSlot.bind(this))
        .join('\n')
    },
    slotContent(name) {
      try {
        const res = this.data.scopedSlots[name]()
        return typeof res === 'string' ? res : 'slot: name'
      } catch (e) {
        return 'slot: name'
      }
    },
    renderSlot(name) {
      if (name === 'default') {
        return this.slotContent(name)
      }

      return `<template slot="${name}">${this.slotContent(name)}</template>`
    },
    propAttr(name) {
      switch (this.comp.props[name].type) {
        default:
          return `${name}="${this.data.props[name]}"`
      }
    },
    onAttr(name) {
      return `@${name}="/* … */"`
    },
  },
}
</script>
