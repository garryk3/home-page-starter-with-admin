<template lang="pug">
  v-container
    admin-header
    admin-auth(v-if="!auth")
    admin-body(v-else)


</template>

<script>
  import AdminHeader from '~/components/AdminHeader'
  import AdminBody from '~/components/AdminBody'
  import AdminAuth from '~/components/AdminAuth'
  import { mapState } from 'vuex'

  export default {
    layout: 'admin',
    computed: mapState({
      auth: state => state.admin.auth
    }),
    components: {
      AdminHeader,
      AdminBody,
      AdminAuth
    }
}
</script>
