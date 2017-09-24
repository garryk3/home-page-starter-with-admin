<template lang="pug">
  v-flex(xs3).admin-sidebar
    h5 Категории
    v-expansion-panel
      v-expansion-panel-content.admin-sidebar__category(v-for="(item,i) in categories", :key="i", :data-index="i", :data-name="item.name")
        div(slot="header", :data-name="item.name", class="admin-sidebar__menu-item")
          v-icon(left, @click="deleteCategory").admin-sidebar__remove remove_circle
          span {{ item.name }}
        v-card
          v-card-text.admin-sidebar__text.grey.lighten-3(v-for="(item, index) in item.articles", :key="index", :data-index="index", :data-name="item.name")
            v-chip.admin-sidebar__chip(@click="deleteArticle", close)
              v-icon.admin-sidebar__edit create
              span.admin-sidebar__cat-name {{ item.name }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: mapState({
      categories: state => state.admin.categories
    }),
    methods: {
      editArticle (e) {
        const article = e.target.closest('.admin-sidebar__text').dataset.name
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        console.log('edit', article, category)
        console.log('edit', e.target)
      },
      deleteArticle (e) {
        const artIndex = e.target.closest('.admin-sidebar__text').dataset.index
        const catIndex = e.target.closest('.admin-sidebar__category').dataset.index
        const article = e.target.closest('.admin-sidebar__text').dataset.name
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        const payload = {catIndex, artIndex, category, article}
        this.$store.dispatch('deleteArticle', payload)
      },
      deleteCategory (e) {
        const catIndex = e.target.closest('.admin-sidebar__category').dataset.index
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        const payload = {catIndex, category}
        this.$store.dispatch('deleteCategory', payload).then((res) => {
          this.$emit('save-success')
        }).catch((err) => {
          this.$emit('save-error', err)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .admin-sidebar {
    padding-top: 10px;

    &__category {
      max-width: 100%;
    }

    &__text {
      padding: 3px 10px;
    }

    &__menu-item {
      position: relative;
      padding-left: 15px;
    }

    &__remove {
      position: absolute;
      left: -15px;
      transition: all 0.2s;
      &:hover {
        color: #bc7575;
      }
    }

    &__cat-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__chip {
      width: 100%;
    }

    &__edit {
      cursor: pointer;
      transition: all .2s;
      &:hover {
        opacity : 0.8;
      }
    }
  }
</style>
