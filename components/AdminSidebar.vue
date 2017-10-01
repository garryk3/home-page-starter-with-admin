<template lang="pug">
  v-flex(xs3).admin-sidebar
    h5 Категории
    v-expansion-panel
      v-expansion-panel-content.admin-sidebar__category(v-for="(item,i) in categories", :key="i", :data-index="i", :data-name="item.name")
        div(slot="header", :data-name="item.name", class="admin-sidebar__menu-item")
          v-icon(left, @click.stop="showDialog", data-name="category", title="удалить категорию").admin-sidebar__remove remove_circle
          span {{ item.name }}
        v-card
          v-card-text.admin-sidebar__text.grey.lighten-3(v-for="(item, index) in item.articles", :key="index", :data-index="index", :data-name="item.name")
            v-chip.admin-sidebar__chip
              v-icon.admin-sidebar__edit(@click="editArticle", title="редактировать статью") create
              span.admin-sidebar__cat-name {{ item.name }}
              v-icon.admin-sidebar__edit(@click.stop="showDialog", data-name="article",title="удалить статью") close
        v-dialog(v-model="dialogArt", persistent)
          v-card
            v-card-title(class="headline") Удалить статью?
            v-card-text Статья будет удалена без возможности восстановления!
            v-card-actions
              v-spacer
              v-btn(class="green--text darken-1", flat="flat", @click.native="dialogArt = false") Нет
              v-btn(class="green--text darken-1", flat="flat", @click="deleteArticle") Да
        v-dialog(v-model="dialogCat", persistent)
          v-card
            v-card-title(class="headline") Удалить категорию?
            v-card-text Категория будет удалена без возможности восстановления вместе со всеми статьями!
            v-card-actions
              v-spacer
              v-btn(class="green--text darken-1", flat="flat", @click.native="dialogCat = false") Нет
              v-btn(class="green--text darken-1", flat="flat", @click="deleteCategory") Да
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        dialogCat: false,
        dialogArt: false,
        target: null
      }
    },
    computed: mapState({
      categories: state => state.admin.categories,
      view: state => state.admin.view
    }),
    methods: {
      editArticle (e) {
        const catIndex = e.target.closest('.admin-sidebar__category').dataset.index
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        const artIndex = e.target.closest('.admin-sidebar__text').dataset.index
        const article = e.target.closest('.admin-sidebar__text').dataset.name
        this.target = { catIndex, artIndex, category, article }
        this.$store.commit('SET_EDITED_ARTICLE', this.target)
        if (this.view === 'article') {
          this.$store.commit('CHANGE_VIEW', 'main')
          setTimeout(() => {
            this.$store.commit('CHANGE_VIEW', 'article')
          }, 0)
        } else {
          this.$store.commit('CHANGE_VIEW', 'article')
        }
      },
      showDialog (e) {
        const type = e.target.dataset.name
        const catIndex = e.target.closest('.admin-sidebar__category').dataset.index
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        if (type === 'category') {
          this.dialogCat = true
          this.target = { catIndex, category }
        } else if (type === 'article') {
          const artIndex = e.target.closest('.admin-sidebar__text').dataset.index
          const article = e.target.closest('.admin-sidebar__text').dataset.name
          this.dialogArt = true
          this.target = { catIndex, artIndex, category, article }
        }
      },
      deleteArticle () {
        this.$store.dispatch('deleteArticle', this.target)
        this.dialogArt = false
        this.target = null
      },
      deleteCategory () {
        this.$store.dispatch('deleteCategory', this.target).then(() => {
          this.$emit('save-success')
          this.dialogCat = false
          this.target = null
        }).catch((err) => {
          this.$emit('save-error', err)
          this.dialogCat = false
          this.target = null
        })
      }
    }
  }
</script>

<style lang="stylus">
  .admin-sidebar {
    padding-top: 10px;

    &__category {
      max-width: 100%;

      > .expansion-panel__header {
        padding: 12px 16px 12px 40px;
      }
    }

    &__text {
      padding: 3px 10px;
    }

    &__menu-item {
      position: relative;
      padding-left: 15px;
      user-select: none;
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
