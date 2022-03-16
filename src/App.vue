<template>
  <LoginPage />
  <router-view/>
</template>

<script>
import LoginPage from './components/LoginPage.vue'


export default {
  name: 'App',
  components: {
    LoginPage
  }
}
</script>

<style>

</style>
