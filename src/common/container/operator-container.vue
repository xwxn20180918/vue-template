<!-- by xiongwen -->

<template>
  <div
    class="operator-container"
  >
    <header class="header" v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <main class="content" v-if="$slots.content">
      <slot name="content"></slot>
    </main>
    <footer class="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>

    <div class="dialog" v-if="$slots.dialog">
      <slot name="dialog"></slot>
    </div>

    <div class="default" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperatorContainer",
  data() {
    return {};
  },

  props: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {},

  components: {}
};
</script>

<style lang="stylus" scoped>
  $border-color = #ebeef5
.operator-container
  width 100%
  .header
    border 1px solid $border-color
    padding 1rem
    margin-bottom 1rem
  .content
    margin-bottom 1rem
    border 1px solid $border-color
    padding 1rem
    font-family: OpenSans,Open Sans,PingFang SC,Microsoft YaHei,Helvetica Neue,Tahoma,Arial,Helvetica;
    line-height: 1.28571;
    color: #333;
  .footer
    border 1px solid $border-color
    padding 1rem
    margin-bottom 1rem
    text-align center

</style>
