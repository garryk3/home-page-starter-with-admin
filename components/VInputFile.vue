<template>
  <v-container class="input-file" fluid>
    <v-layout row wrap>
        <v-flex xs12 class="input-file__wrapper">
          <input
            type="file"
            class="input-file__input"
            :name="name"
            ref="input"
            @change="saveImages"
            :multiple="multipleFile">
          <v-btn class="dark--text input-file__upload-btn" block @click="onChange">
            <v-icon left right>backup</v-icon>
            <span class="input-file__title">
              {{ title }}
              <span v-if="required"></span>
            </span>
          </v-btn>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="showImages">
      <v-flex v-for="(item, index) in images" key="index" v-bind="size">
        <v-card class="input-file__img-wrapper" flat tile>
          <v-icon class="input-file__close" :data-num="index" @click="deleteImage">close</v-icon>
          <div class="input-file__img" :height="imgHeight">
            <img :src="item" alt="">
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
    watch: {
      defaultImages () {
        console.log('def img', this.defaultImages)
        return this.defaultImages
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
          if (this.defaultImages && !this.loadedImages.length) {
            return this.defaultImages
          } else {
            return this.loadedImages
          }
        },
        set (val) {
          return val
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
          this.loadedImages = arr
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
        this.images = this.images.splice(num, 1)
        this.files.splice(num, 1)
        this.$refs.input.value = ''
        this.fileUpload && this.$emit(this.fileUpload, this.files)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .input-file {
    padding: 0;
    color: rgba(0,0,0,.54);

    &__img {
      height: 150px;
      object-fit: contain;
      overflow: hidden;

      img {
        width: 100%;
      }
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
