<template lang="pug">
  v-layout(row, wrap, class="admin-header")
    v-flex(xs12)
      v-toolbar
        v-toolbar-title Панель редактора
        v-spacer
        v-toolbar-side-icon.hidden-md-and-up
        v-toolbar-items.hidden-sm-and-down
          v-btn(flat, append, to="/") Перейти на сайт
        span(v-if="auth") login name
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      auth: state => state.admin.auth
    })
  }
</script>

<style scoped>
  .admin-header {
    margin-bottom: 25px !important;
  }
</style>
