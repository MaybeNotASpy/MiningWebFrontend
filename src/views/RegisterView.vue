<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input type="text" name="username" v-model="user.username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="full_name" class="form-label">Full Name:</label>
        <input type="text" name="full_name" v-model="user.full_name" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" name="password" v-model="user.password" class="form-control" />
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

    const user = {
      username: '',
      full_name: '',
      password: ''
    }

    async function submit () {
      try {
        await store.dispatch('users/register', this.user)
        router.push('/dashboard')
      } catch (error) {
        console.log(error)
        throw new Error('Username already exists. Please try again.')
      }
    }

    return {
      user,
      submit
    }
  }
}
</script>
