<template lang="pug">
  v-card
    v-card-title(primary-title)
      h6 Статья
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
              input-file(show-images, required, title="Главное изображение", large, fileUpload="input2", @input2="saveInput2")
            v-flex(xs6).admin-article__right
              v-text-field(v-model="shortText", :rules="lengthRules", label="Краткое описание статьи", required, textarea, rows="7")
          v-layout
            v-flex(xs6)
              input-file(show-images, multiple-file, title="Галерея", small, fileUpload="input1", @input1="saveInput1")
          v-layout
            v-flex(xs12)
              .quill-editor.admin-article__quill(
                v-model="content",
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
  import { mapGetters, mapState } from 'vuex'
  import InputFile from '~/components/InputFile'

  export default {
    components: { InputFile },
    created () {
      if (this.editedArticle) {
        this.$store.dispatch('getArticle').then((res) => {
          if (res.data.error) {
            this.$emit('save-error', res.data.error)
          }
          this.select = res.data.category
          this.title = res.data.title
          this.name = res.data.name
          this.keywords = res.data.keywords
          this.shortText = res.data.shortText
          this.mainImg = res.data.mainImg
          this.gallery = res.data.gallery
          this.content = res.data.content
        })
      }
    },
    beforeDestroy () {
      this.timeout && (this.timeout = null)
    },
    data () {
      return {
        lengthRules: [
          (v) => !!v || 'Заполните поле'
        ],
        valid: false,
        images1: null,
        images2: null,
        select: null,
        shortText: '',
        title: '',
        name: '',
        keywords: '',
        article: false,
        loading: false,
        timeout: null,
        content: '',
        editorOption: {
          placeholder: 'Текст статьи...',
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
              ['image'],
              ['clean']
            ]
          }
        }
      }
    },
    computed: {
      ...mapGetters(['pureCategories']),
      ...mapState({
        editedArticle: state => state.admin.editedArticle
      })
    },
    methods: {
      saveInput1 (files) {
        this.images1 = files
      },
      saveInput2 (files) {
        this.images2 = files
      },
      saveArticle () {
        const form = this.$refs.form
        const data = new FormData(form)
        const images1 = this.images1
        const images2 = this.images2
        const action = this.editedArticle ? 'editArticle' : 'addArticle'
        if (form.validate()) {
          data.append('category', this.select)
          data.append('title', this.title)
          data.append('name', this.name)
          data.append('keywords', this.keywords)
          data.append('content', this.content)
          data.append('shortText', this.shortText)
          this.images1 && data.append('mainImg', images1)
          this.images2 && data.append('gallery', images2)
          this.$store.dispatch(action, data).then((res) => {
            if (res.data.error) {
              this.$emit('save-error', res.data.error)
            } else {
              this.$emit('save-success')
              this.timeout = setTimeout(() => {
                this.$store.commit('CHANGE_VIEW', 'main')
                this.$store.dispatch('getDocumentsNames')
              }, 1000)
            }
          })
          this.$store.commit('SET_EDITED_ARTICLE', null)
        }
      },
      closeArticle () {
        this.$store.commit('CHANGE_VIEW', 'main')
        this.$store.commit('SET_EDITED_ARTICLE', null)
      }
    }
  }
</script>

<style lang="stylus">
  .admin-article {

    &__buttons {
      margin-top: 60px !important;
    }

    &__notice {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    &__right {
      padding-left: 40px;
    }

    .ql-snow .ql-formats {
      vertical-align: top
      }
  }
</style>
