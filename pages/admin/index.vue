<template lang="pug">
  v-layout(row, wrap)
    admin-sidebar
    v-flex(xs9).admin__body
      h5.admin__header Редактирование
      admin-article(v-if="view === 'article'", v-on:closeArticle="mainView")
      admin-main(v-else, v-on:changeView="articleView")


</template>

<script>
import AdminSidebar from '~/components/AdminSidebar'
import AdminMain from '~/components/AdminMain'
import AdminArticle from '~/components/AdminArticle'
import { mapState } from 'vuex'

export default {
  layout: 'admin',
  beforeMount () {
    this.$store.dispatch('getDocumentsNames')
  },
  data () {
    return {
      dialog: false,
      view: 'main'
    }
  },
  computed: mapState({}),
  components: {
    AdminSidebar,
    AdminMain,
    AdminArticle
  },
  methods: {
    articleView () {
      this.view = 'article'
    },
    mainView () {
      this.view = 'main'
    }
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
