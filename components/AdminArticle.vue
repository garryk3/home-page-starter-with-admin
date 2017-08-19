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
            v-text-field(label="Краткое описание статьи", required, textarea, rows="10")


</template>

<script>
  export default {
    components: {},
    data () {
      return {
        article: false
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
</style>
