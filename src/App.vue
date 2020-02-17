<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBar
  }
}
</script>
