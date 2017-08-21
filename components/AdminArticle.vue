<template lang="pug">
  v-card
    v-card-title(primary-title)
      h6 Статья
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
        v-layout(row, justify-center)
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
        content: '<p>I am Example</p>',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block']
            ]
          }
        }
      }
    },
    methods: {
      saveArticle () {
        console.log('save article')
      },
      closeArticle () {
        console.log('close')
      }
    }
  }
</script>

<style lang="stylus">
</style>
