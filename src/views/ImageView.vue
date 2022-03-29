<template>
  <div v-if="image">
    <p><strong>Title:</strong> {{ image.title }}</p>
    <p><strong>Content:</strong> {{ image.content }}</p>
    <p><strong>Author:</strong> {{ image.author.username }}</p>

    <div v-if="user.id === image.author.id">
      <p><router-link :to="{name: 'EditImage', params:{id: image.id}}" class="btn btn-primary">Edit</router-link></p>
      <p><button @click="removeImage()" class="btn btn-secondary">Delete</button></p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const store = useStore()

    async function created () {
      try {
        await this.viewImage(this.id)
      } catch (error) {
        console.error(error)
        router.push('/dashboard')
      }
    }

    async function removeImage () {
      try {
        await this.deleteImage(this.id)
        router.push('/dashboard')
      } catch (error) {
        console.error(error)
      }
    }

    return {
      created,
      removeImage,
      image: computed(() => store.getters['images/stateImage']),
      user: computed(() => store.getters['images/stateUser']),
      viewImage: (imageId) => store.dispatch('image/viewImage', imageId),
      deleteImage: (imageId) => store.dispath('image/deleteImage', imageId)
    }
  }
  // props: ['id'],
}
</script>
