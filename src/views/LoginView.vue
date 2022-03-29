<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input type="text" name="username" v-model="form.username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" name="password" v-model="form.password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import router from '../router'
export default {
  setup () {
    const store = useStore()
    const form = {
      username: '',
      password: ''
    }
    async function submit () {
      const User = new FormData()
      User.append('username', this.form.username)
      User.append('password', this.form.password)
      await store.dispatch('users/logIn', User)
      console.log('test')
      router.push('/dashboard')
    }

    return {
      form,
      submit
    }
  }
}
</script>
