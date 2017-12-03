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
                v-model="category",
                :rules="lengthRules",
                label="Выберите категорию",
                data-vv-name="category",
                required)
              v-text-field(
                :rules="lengthRules",
                v-model="title",
                label="Заголовок страницы",
                required,
                hint="title (для отображения заголовка страницы в поисковой системе)",
                persistent-hint
              )
              v-text-field(
                :rules="lengthRules",
                v-model="name",
                label="Название статьи",
                required,
                hint="tag H1 (главный заголовок страницы)",
                persistent-hint
              )
              v-text-field(
                :rules="lengthRules",
                v-model="description",
                label="Описание",
                required,
                hint="description (для отображения описания в поисковой системе)",
                persistent-hint
              )
              v-text-field(
                :rules="lengthRules",
                v-model="keywords",
                label="Ключевые слова",
                required,
                hint="keywords (через запятую)",
                persistent-hint
              )
              v-input-file(
                show-images,
                required,
                name="mainImg"
                title="Главное изображение",
                large,
                fileUploadEvent="inputSaveEventMain",
                @inputSaveEventMain="saveMainImage",
                :defaultImages="defaultImagesMain"
              )
            v-flex(xs6).admin-article__right
              v-text-field(
                v-model="shortText",
                :rules="lengthRules",
                label="Краткое описание статьи",
                required,
                textarea,
                rows="7"
              )
              span * - помечены поля, обязательные для заполнения
          v-layout
            v-flex(xs6)
              v-input-file(
                show-images,
                multiple-file,
                name="gallery",
                title="Галерея",
                small,
                fileUploadEvent="inputSaveEventGallery",
                @inputSaveEventGallery="saveGalleryImages",
                :defaultImages="defaultImagesGallery"
              )
          v-layout
            div
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
                class="admin-article__btn-save"
              ) Сохранить
              v-btn.blue-grey.white--text(@click="closeArticle") Закрыть

</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import VInputFile from '~/components/VInputFile'

  export default {
    components: { VInputFile },
    created () {
      if (this.editedArticle) {
        this.$store.dispatch('getArticle').then((res) => {
          if (res.data.error) {
            this.$emit('save-error', res.data.error)
          } else {
            this.saveDefaultValues(res.data)
          }
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
        imagesMain: null,
        defaultImagesMain: null,
        defaultImagesGallery: null,
        imagesGallery: null,
        category: null,
        shortText: '',
        title: '',
        name: '',
        keywords: '',
        description: '',
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
      saveDefaultValues (data) {
        this.category = data.category
        this.title = data.title
        this.name = data.name
        this.keywords = data.keywords
        this.description = data.description
        this.shortText = data.shortText
        this.defaultImagesMain = data.mainImg
        this.defaultImagesGallery = data.gallery
        this.content = data.content
      },
      saveMainImage (files) {
        this.imagesMain = files
      },
      saveGalleryImages (files) {
        this.imagesGallery = files
      },
      sendData (action, data) {
        this.$store.dispatch(action, data).then((res) => {
          if (res.data.error) {
            this.$emit('save-error', res.data.error)
          } else {
            this.$emit('save-success')
            this.$store.commit('SET_EDITED_ARTICLE', null)
            this.timeout = setTimeout(() => {
              this.$store.commit('CHANGE_VIEW', 'main')
              this.$store.dispatch('getArticlesNames')
            }, 1000)
          }
        })
      },
      saveArticle () {
        const data = new FormData()
        const action = this.editedArticle ? 'editArticle' : 'addArticle'
        const imagesMain = this.imagesMain || this.defaultImagesMain
        const imagesGallery = this.imagesGallery || this.defaultImagesGallery

        if (this.$refs.form.validate()) {
          data.append('category', this.category)
          data.append('title', this.title)
          data.append('name', this.name)
          data.append('keywords', this.keywords)
          data.append('description', this.description)
          data.append('content', this.content)
          data.append('shortText', this.shortText)

          if (imagesMain && imagesMain.length) {
            if (typeof imagesMain[0] === 'object') {
              data.append('mainImg', imagesMain[0], imagesMain[0].name)
            } else if (typeof imagesMain[0] === 'string') {
              data.append('mainImg', JSON.stringify(imagesMain))
            }
          }
          if (imagesGallery && imagesGallery.length) {
            if (typeof imagesGallery[0] === 'object') {
              for (let i = 0; i < imagesGallery.length; i++) {
                data.append('gallery', imagesGallery[i], imagesGallery[i].name)
              }
            } else if (typeof imagesGallery[0] === 'string') {
              data.append('gallery', JSON.stringify(imagesGallery))
            }
          }
          this.editedArticle && data.append('_id', this.editedArticle._id)
          this.sendData(action, data)
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
    &__btn-save {
      margin-left: 0;
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
