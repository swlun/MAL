<template>
  <v-app>
    <NavBar />
    <ToolBar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import ToolBar from './components/ToolBar'

export default {
  name: 'App',
  components: {
    NavBar,
    ToolBar
  },
  created() {
    this.$store.dispatch('GetAllUsers');
  }
}
</script>
