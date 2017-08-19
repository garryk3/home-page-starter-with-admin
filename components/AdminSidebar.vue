<template lang="pug">
  v-flex(xs3).admin-sidebar
    h5 Категории
    v-expansion-panel
      v-expansion-panel-content(v-for="(item,i) in 5", v-bind:key="i")
        div(slot="header") Item
        v-card
          v-card-text.grey.lighten-3 Lorem ipsum dolor -text>
</template>

<style scoped lang="stylus">
  .admin-sidebar {
    padding-top: 10px;
  }
</style>
