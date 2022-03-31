<template>
  <section>
    <p>This site is built with FastAPI and Vue.</p>

    <div v-if="isLoggedIn" id="logout">
      <p id="logout">Click <a href="/dashboard">here</a> to view all images.</p>
    </div>
    <p v-else>
      <span><a href="/register">Register</a></span>
      <span> or </span>
      <span><a href="/login">Log In</a></span>
    </p>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'HomeView',
  setup () {
    const store = useStore()
    return {
      isLoggedIn: computed(() => store.getters['users/isAuthenticated'])
    }
  }
}
</script>
