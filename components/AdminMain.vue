<template lang="pug">
  v-card
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
              v-text-field(label="название", name="name", required)
            v-card-actions
              v-spacer
              v-btn.blue--text.darken-1(flat, @click.native="dialog = false") Закрыть
              v-btn.blue--text.darken-1(flat, v-on:click="createCategory") Создать категорию
      v-btn(primary, light, v-on:click="createArticle") Создать статью
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      createCategory () {
        console.log('create category', this.dialog)
      },
      createArticle () {
        console.log('create article')
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
