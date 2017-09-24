<template lang="pug">
  v-card
    v-card-title(primary-title)
      div Для создания или редактирования статьи выберите ее из выпадающего списка слева
    v-layout(row, justify-center, style="position: relative;")
      v-dialog(v-model="dialog", content-class="admin-main__popup")
        v-btn(slot="activator") Создать категорию
        v-layout(row, justify-center, style="position: relative;")
          v-card(raised)
            v-card-title
              span.headline Введите название категории
            v-card-text
              v-text-field(v-model="categoryName", label="название", name="name", required)
            v-card-actions
              v-spacer
              v-btn.blue--text.darken-1(flat, @click.native="dialog = false") Закрыть
              v-btn.blue--text.darken-1(flat, @click="createCategory") Создать категорию
      v-btn(@click="createArticle") Создать статью
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        categoryName: ''
      }
    },
    computed: mapState({
      categories: state => state.admin.categories,
      view: state => state.admin.view
    }),
    methods: {
      createCategory () {
        if (this.categoryName.length) {
          this.$store.dispatch('addCategory', this.categoryName)
            .then(
              () => {
                this.$emit('save-success')
                this.dialog = false
              })
            .catch((error) => {
              this.$emit('save-error', error)
            })
        }
      },
      createArticle () {
        this.$store.dispatch('changeView', 'article')
      }
    }
  }
</script>

<style lang="stylus">
  .admin-main {

    &__popup {
      overflow-x hidden;
    }
  }
</style>
