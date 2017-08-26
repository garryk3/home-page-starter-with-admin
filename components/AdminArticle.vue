<template lang="pug">
  v-card
    v-card-title(primary-title)
      h6 Статья
      v-alert(success, :value="notice").admin-article__notice Сохранено
    v-card-text
      v-container(fluid)
        v-layout(row)
          v-flex(xs6)
            v-text-field(label="Заголовок страницы", required, hint="title", persistent-hint)
            v-text-field(label="Название статьи", required, hint="tag H1", persistent-hint)
            v-text-field(label="Ключевые слова", required, hint="keywords (через запятую)", persistent-hint)
            v-text-field(
              required,
              hint="Основное изображение, необходимое для отображения краткого содержания статьи",
              type="file"
              persistent-hint
            )
          v-flex(xs6)
            v-text-field(label="Краткое описание статьи", required, textarea, rows="7")
            v-text-field(
              hint="Изображения для галереи",
              type="file",
              multiple,
              persistent-hint
            )
        v-layout
          v-flex(xs12)
            .quill-editor(
              :content="content",
              v-quill:myQuillEditor="editorOption"
            )
        v-layout(row, justify-center).admin-article__buttons
          v-flex(xs12)
            v-btn(secondary, :loading="loading", @click="saveArticle", :disabled="loading") Сохранить
            v-btn.blue-grey.white--text(@click="closeArticle") Закрыть

</template>

<script>
  export default {
    components: {},
    data () {
      return {
        article: false,
        loading: false,
        notice: false,
        content: '<p>Текст статьи...</p>',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],

              [{'header': 1}, {'header': 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],

              [{'header': [1, 2, 3, 4, 5, 6, false]}],

              [{'color': []}, {'background': []}],
              [{'font': []}],
              [{'align': []}],
              ['image']
            ]
          }
        }
      }
    },
    methods: {
      saveArticle () {
        this.notice = true
        setTimeout(() => {
          this.$emit('closeArticle')
        }, 1000)
      },
      closeArticle () {
        this.$emit('closeArticle')
      }
    }
  }
</script>

<style lang="stylus">
  .admin-article {
    &__buttons {
      margin-top: 100px;
    }
    &__notice {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
</style>
