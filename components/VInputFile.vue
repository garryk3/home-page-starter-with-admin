<template lang="pug">
  v-container(fluid).input-file
    v-layout(row, wrap)
      v-flex(xs12).input-file__wrapper
        input.input-file__input(:name="name", ref="input", type="file", @change="saveImages", :multiple="multipleFile")
        v-btn.dark--text.input-file__upload-btn(block, @click="onChange")
          v-icon(left, light) backup
          span.input-file__title {{ title }}
            span(v-if="required") *
    v-layout(row, wrap, v-if="showImages")
      v-flex(v-for="(item, index) in images", key="index", v-bind="size")
        v-card.input-file__img-wrapper(flat, tile)
          v-icon.input-file__close(:data-num="index", @click="deleteImage") close
          v-card-media.input-file__img(:src="item", :height="imgHeight")
</template>

<script>
  import config from '../config'
  const apiUrl = config.apiUrl

  export default {
    data () {
      return {
        files: [],
        loadedImages: []
      }
    },
    props: {
      defaultImages: {
        type: Array
      },
      fileUpload: {
        type: String
      },
      imgHeight: {
        default: 150,
        type: Number
      },
      small: {
        default: false,
        type: Boolean
      },
      middle: {
        default: false,
        type: Boolean
      },
      large: {
        default: false,
        type: Boolean
      },
      multipleFile: {
        default: false,
        type: Boolean
      },
      showImages: {
        default: false,
        type: Boolean
      },
      title: {
        default: 'Выберите файлы',
        type: String
      },
      required: {
        default: false,
        type: Boolean
      },
      name: {
        default: 'files',
        type: String
      }
    },
    computed: {
      size () {
        if (this.small) {
          return {xs4: true}
        } else if (this.middle) {
          return {xs6: true}
        } else {
          return {xs12: true}
        }
      },
      images: {
        get () {
          if (this.defaultImages && this.defaultImages.length && !this.loadedImages.length) {
            return this.defaultImages.map((item) => {
              return apiUrl + item
            })
          } else {
            return this.loadedImages
          }
        },
        set (value) {
          this.loadedImages = value
        }
      }
    },
    methods: {
      onChange () {
        this.$refs.input.click()
      },
      createImages (file) {
        const arr = []
        if (file.length) {
          this.files = Array.from(file)
          this.files.forEach((item) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              arr.push(e.target.result)
            }
            reader.readAsDataURL(item)
          })
          this.images = arr
          console.log('img', this.images, arr)
        }
      },
      saveImages (e) {
        const files = e.target.files
        if (files.length) {
          this.createImages(files)
          this.fileUpload && this.$emit(this.fileUpload, this.files)
        }
      },
      deleteImage (e) {
        const num = +e.target.dataset.num
        console.log('num', num, e.target, this.images)
        this.images.splice(num, 1)
        this.files.splice(num, 1)
        this.$refs.input.value = ''
        this.fileUpload && this.$emit(this.fileUpload, this.files)
        console.log('num 2', this.images)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .input-file {
    padding: 0;
    color: rgba(0,0,0,.54);

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__input {
      z-index: 2;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      visibility : hidden
    }

    &__wrapper {
      position: relative;
      display: block;
      margin-bottom: 10px;
    }

    &__img-wrapper {
      position : relative;
      margin-bottom: 15px;
      object-fit: contain;
      overflow: hidden;
    }

    &__close {
      position: absolute
      top: 2px
      z-index: 2;
      right: 2px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      transition all 0.2s;

      &:hover {
        opacity 0.6
      }
    }

    &__title  {
      font-size: 16px;
      line-height: 28px;
      user-select: none;
      overflow : hidden;
      text-overflow: ellipsis;
      white-space : nowrap;
    }

    &__upload-btn {
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
    }
  }
</style>
