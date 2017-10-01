 <template lang="pug">
   v-app
     v-container(grid-list-md)
       v-layout(row, wrap)
        v-flex(xs12)
         v-toolbar
          v-toolbar-title Панель редактора
          v-spacer
          v-toolbar-side-icon.hidden-md-and-up
          v-toolbar-items.hidden-sm-and-down
            v-btn(flat, append, to="/") Перейти на сайт
       .admin-container
        nuxt
</template>
<style lang="stylus">
  .admin-container {
    margin-top: 25px;
  }
</style>

