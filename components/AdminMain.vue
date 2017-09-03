<template lang="pug">
  v-card
    v-alert(success, :value="saveSuccess").admin-main__notice Сохранено
    v-alert(error, :value="saveError").admin-main__notice Ошибка {{ error }}
    v-card-title(primary-title)
      div Для создания или редактирования статьи выберите ее из выпадающего списка слева
    v-layout(row, justify-center, style="position: relative;")
      v-dialog(v-model="dialog", content-class="admin-main__popup")
        v-btn(primary, light, slot="activator") Создать категорию
        v-layout(row, justify-center, style="position: relative;")
          v-card(raised)
            v-card-title
              span.headline Введите название категории
            v-card-text
              v-text-field(v-model="categoryName", label="название", name="name", required)
            v-card-actions
              v-spacer
              v-btn.blue--text.darken-1(flat, @click.native="dialog = false") Закрыть
              v-btn.blue--text.darken-1(flat, v-on:click="createCategory") Создать категорию
      v-btn(primary, light, v-on:click="createArticle") Создать статью
</template>

<script>
  import {http} from '~/plugins/axios'
  export default {
    data () {
      return {
        dialog: false,
        categoryName: '',
        saveSuccess: false,
        saveError: false,
        timeout: null,
        error: null
      }
    },
    methods: {
      createCategory () {
        if (this.categoryName.length) {
          http.post('/add-category', {title: this.categoryName})
            .then(() => {
              this.saveSuccess = true
              http.get('/get-categories')
                .then((res) => {
                  this.$store.commit('getCategories', res.data)
                })
              this.timeout = setTimeout(() => {
                this.dialog = false
                this.saveSuccess = false
                this.categoryName = ''
              }, 1000)
            })
            .catch((error) => {
              this.error = error.message
              this.saveError = true
              this.timeout = setTimeout(() => {
                this.saveError = false
                this.error = null
              }, 2000)
            })
        }
      },
      createArticle () {
        this.$emit('changeView')
      }
    },

    beforeDestroy () {
      this.timeout && clearTimeout(this.timeout)
    }
  }
</script>

<style lang="stylus">
  .admin-main {
    &__popup {
      overflow-x hidden;
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
