<template lang="pug">
  v-card
    v-card-title(primary-title)
      h6 Статья
      v-alert(success, :value="notice").admin-article__notice Сохранено
    v-card-text
      v-container(fluid)
        v-form(ref="form", v-model="valid")
          v-layout(row)
            v-flex(xs6)
              v-select(
                :items="pureCategories",
                v-model="select",
                :rules="lengthRules",
                label="Выберите категорию",
                data-vv-name="select",
                required)
              v-text-field(:rules="lengthRules", v-model="title", label="Заголовок страницы", required, hint="title", persistent-hint)
              v-text-field(:rules="lengthRules", v-model="name", label="Название статьи", required, hint="tag H1", persistent-hint)
              v-text-field(:rules="lengthRules", v-model="keywords", label="Ключевые слова", required, hint="keywords (через запятую)", persistent-hint)
              v-text-field(
                required,
                hint="Основное изображение, необходимое для отображения краткого содержания статьи",
                type="file",
                name="mainImg",
                persistent-hint
              )
            v-flex(xs6)
              v-text-field.admin-article__short-text(label="Краткое описание статьи", required, textarea, rows="7")
              v-text-field.admin-article__gallery(
                hint="Изображения для галереи",
                type="file",
                name="gallery",
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
              v-btn(
                secondary,
                :loading="loading",
                @click.prevent="saveArticle",
                :disabled="loading",
                type="submit",
                formenctype="multipart/form-data",
                formmethod="post"
              ) Сохранить
              v-btn.blue-grey.white--text(@click="closeArticle") Закрыть

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    data () {
      return {
        lengthRules: [
          (v) => !!v || 'Заполните поле'
        ],
        valid: false,
        select: null,
        title: '',
        name: '',
        keywords: '',
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
    computed: mapGetters({
      pureCategories: 'pureCategories'
    }),
    methods: {
      saveArticle () {
        const form = this.$refs.form
        const data = new FormData(form)
        const category = this.select
        const title = this.title
        const name = this.title
        const keywords = this.keywords
        console.log('s', form.validate())
        if (form.validate()) {
          console.log(title, name, keywords)
          data.append('category', category.innerHTML)
          data.append('title', title)
          data.append('name', name)
          data.append('keywords', keywords)
        } else {
          return
        }
        this.$store.dispatch('sendForm', data)
        // this.notice = true
        // setTimeout(() => {
        // this.$store.dispatch('changeView', 'main')
        // }, 1000)
      },
      closeArticle () {
        this.$store.dispatch('changeView', 'main')
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
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
</style>
