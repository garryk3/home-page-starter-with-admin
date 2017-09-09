<template lang="pug">
  v-layout(row, wrap)
    admin-sidebar
    v-flex(xs9).admin__body
      h5.admin__header Редактирование
      admin-article(v-if="view === 'article'")
      admin-main(v-else)


</template>

<script>
import AdminSidebar from '~/components/AdminSidebar'
import AdminMain from '~/components/AdminMain'
import AdminArticle from '~/components/AdminArticle'
import { mapState } from 'vuex'

export default {
  layout: 'admin',
  beforeCreate () {
    this.$store.dispatch('getDocumentsNames')
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: mapState({
    view: state => state.admin.view
  }),
  components: {
    AdminSidebar,
    AdminMain,
    AdminArticle
  }
}
</script>

<style scoped lang="stylus">
  .admin {
    &__body {
      padding-top: 10px;
    }
    &__header {
      text-align: center
    }
  }
</style>
