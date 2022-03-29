<template>
  <section>
    <h1>Your Profile</h1>
    <hr/><br/>
    <div>
      <p><strong>Full Name:</strong> <span>{{ user.full_name }}</span></p>
      <p><strong>Username:</strong> <span>{{ user.username }}</span></p>
      <p><button @click="deleteAccount()" class="btn btn-primary">Delete Account</button></p>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    async function deleteAccount () {
      try {
        await this.deleteUser(this.user.id)
        await store.dispatch('users/logOut')
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }

    return {
      created: () => store.dispatch('users/viewMe'),
      deleteUser: () => store.dispatch('users/deleteUser'),
      user: computed(() => store.getters['users/stateUser']),
      deleteAccount
    }
  }
}
</script>
