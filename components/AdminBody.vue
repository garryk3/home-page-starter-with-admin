<template lang="pug">
  v-layout(row, wrap, v-else)
    v-alert(success, :value="saveSuccess").admin-body__notice Сохранено
    v-alert(error, :value="saveError").admin-body__notice Ошибка: {{ error }}
    admin-sidebar(@save-success="saveSuccessEvent", @save-error="saveErrorEvent")
    v-flex(xs9).admin-body__body
      h5.admin-body__header Редактирование
      admin-article(v-if="view === 'article'", @save-success="saveSuccessEvent", @save-error="saveErrorEvent")
      admin-main(v-else, @save-success="saveSuccessEvent", @save-error="saveErrorEvent")
</template>

<script>
  import AdminHeader from '~/components/AdminHeader'
  import AdminBody from '~/components/AdminBody'
  import AdminSidebar from '~/components/AdminSidebar'
  import AdminMain from '~/components/AdminMain'
  import AdminArticle from '~/components/AdminArticle'
  import { mapState } from 'vuex'

  export default {
    layout: 'admin',
    beforeCreate () {
      this.$store.dispatch('getArticlesNames')
        .catch((err) => {
          this.saveErrorEvent(err)
        })
    },
    beforeDestroy () {
      this.timeout && clearTimeout(this.timeout)
    },
    data () {
      return {
        dialog: false,
        saveSuccess: false,
        saveError: false,
        timeout: null,
        error: ''
      }
    },
    computed: mapState({
      view: state => state.admin.view
    }),
    methods: {
      saveSuccessEvent () {
        this.saveSuccess = true
        this.timeout = setTimeout(() => {
          this.saveSuccess = false
        }, 3000)
      },
      saveErrorEvent (err) {
        this.saveError = true
        this.error = err.message || err.errmsg
        this.timeout = setTimeout(() => {
          this.saveError = false
          this.error = ''
        }, 3000)
      }
    },
    components: {
      AdminSidebar,
      AdminMain,
      AdminArticle,
      AdminHeader,
      AdminBody
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

    &__notice {
      z-index: 5;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
</style>
