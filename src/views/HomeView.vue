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
// @ is an alias to /src

export default {
  name: 'HomeView',
  setup () {
    const isLoggedIn = () => this.$store.getters.isAuthenticated
    return {
      isLoggedIn
    }
  }
}
</script>
