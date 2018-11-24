<!--
This component show spinner for flag == false.
When flag === true, spinner will be hide and show content in slot
-->

<template lang="html">
  <div>
    <div class="text" v-if='!flag'>
      <div  :uk-spinner="setting"></div>
      <small> {{ inner }}</small>
    </div>
    <slot v-if="flag"></slot>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    flag: {
      required: true,
      type: Boolean
    },
    inner: String,
    ratio: {
      default: 1
    }
  },
  computed: {
    setting() {
      return `ratio: ${this.ratio}`
    }
  }
}
</script>
<style lang="less">
  .uk-text-left {
    .text {
      text-align: left;
    }
  }

  .text {
    text-align: center;
  }

</style>
