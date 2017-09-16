<template lang="pug">
  v-container(fluid).input-file
    v-layout(row, wrap)
      v-flex(xs12)
        label.input-file__wrapper
          span.input-file__title {{ title }}
            span(v-if="required") *
          input.input-file__input(type="file", @change="saveImages", :multiple="multipleFile", placeholder="lll")
    v-layout(row, wrap, v-if="showImages")
      v-flex(v-for="item in images", key="index", xs4)
        v-card.input-file__img-wrapper(flat, tile, height="50")
          img.input-file__img(:src="item")
</template>

<script>
  export default {
    data () {
      return {
        images: [],
        files: []
      }
    },
    props: {
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
      }
    },
    methods: {
      createImages (file) {
        const arr = []
        if (file.length) {
          const arrFiles = Array.from(file)
          arrFiles.forEach((item) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              arr.push(e.target.result)
            }
            reader.readAsDataURL(item)
          })
          console.log('arr', arr)
          this.images = arr
        }
        // const image = new Image()
      },
      saveImages (e) {
        const files = e.target.files
        if (files.length) {
          this.createImages(files)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .input-file {
    padding: 0;
    color: rgba(0,0,0,.54);
    margin: 20px 0;
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__input {
      position: absolute;
      width: 100%;
      height: 100%;
      visibility : hidden
    }
    &__wrapper {
      display: block;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0,0,0,.42);
      &:hover {
        border-bottom: 1px solid rgba(0,0,0,.87);
      }
    }
    &__img-wrapper {
      height: 150px;
      padding: 5px;
      object-fit: contain;
      overflow: hidden;
    }
    &__title  {
      display: block;
      font-size: 16px;
      line-height: 28px;
    }
  }
</style>
