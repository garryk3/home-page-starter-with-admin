<template lang="pug">
  v-flex(xs3).admin-sidebar
    h5 Категории
    v-expansion-panel
      v-expansion-panel-content.admin-sidebar__category(v-for="(item,i) in categories", :key="i", :data-index="i", :data-name="item.name")
        div(slot="header", :data-name="item.name", class="admin-sidebar__menu-item")
          v-icon(left, @click="deleteCategory", data-name="category", title="удалить категорию").admin-sidebar__remove remove_circle
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
            v-card-text Статья будет удалена без возможности восстановления
            v-card-actions
              v-spacer
              v-btn(class="green--text darken-1", flat="flat", @click.native="dialogArt = null") Нет
              v-btn(class="green--text darken-1", flat="flat", @click.native="deleteArticle") Да
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        dialogCat: null,
        dialogArt: null
      }
    },
    computed: mapState({
      categories: state => state.admin.categories
    }),
    methods: {
      editArticle (e) {
        console.log('ee', e.target)
        e = true
      },
      showDialog (e) {
        const type = e.target.dataset.name
        const catIndex = e.target.closest('.admin-sidebar__category').dataset.index
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        if (type === 'category') {
          this.dialogCat = { catIndex, category }
        } else if (type === 'article') {
          const artIndex = e.target.closest('.admin-sidebar__text').dataset.index
          const article = e.target.closest('.admin-sidebar__text').dataset.name

          this.dialogArt = { catIndex, artIndex, category, article }
        }
      },
      deleteArticle () {
        console.log('sa', this.dialogArt)

        this.$store.dispatch('deleteArticle', this.dialogArt)
        this.dialogArt = null
      },
      deleteCategory (e) {
        const catIndex = e.target.closest('.admin-sidebar__category').dataset.index
        const category = e.target.closest('.admin-sidebar__category').dataset.name
        const payload = {catIndex, category}
        this.$store.dispatch('deleteCategory', payload).then(() => {
          this.$emit('save-success')
        }).catch((err) => {
          this.$emit('save-error', err)
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
