<template lang="pug">
  v-flex(xs3).admin-sidebar
    h5 Категории
    v-expansion-panel
      v-expansion-panel-content(v-for="(item,i) in categories", :key="i")
        div(slot="header", :data-name="item.name", class="admin-sidebar__menu-item") {{ item.name }}
        v-card
          v-card-text.grey.lighten-3(v-for="(item, i) in item.articles", :key="i", :data-name="item.names") {{ item.name }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: mapState(['categories']),
    methods: {
    }
  }
</script>

<style scoped lang="stylus">
  .admin-sidebar {
    padding-top: 10px;
  }
</style>
