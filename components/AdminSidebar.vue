<template lang="pug">
  v-flex(xs3).admin-sidebar__left
    h5 Категории
    v-expansion-panel
      v-expansion-panel-content(v-for="(item,i) in 5", key="i")
        div(slot="header") Item
        v-card
          v-card-text.grey.lighten-3 Lorem ipsum dolor -text>
</template>

<style scoped lang="stylus">
  .admin-sidebar {

    &__left {
      margin-top: 15px;
      padding-top: 10px;
    }

  }
</style>
