<template lang="pug">
  v-layout(row, wrap)
    AdminSidebar
    v-flex(xs9)
      div center
</template>

<script>
import AdminSidebar from '~/components/AdminSidebar'
export default {
  layout: 'admin',
  data () {
    return {
      cats: ['name1', 'name2']
    }
  },
  components: {AdminSidebar}
}
</script>

<style scoped lang="stylus">

</style>
