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
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Image',
  props: ['id'],
  async created() {
    try {
      await this.viewImage(this.id);
    } catch (error) {
      console.error(error);
      this.$router.push('/dashboard');
    }
  },
  computed: {
    ...mapGetters({ image: 'stateImage', user: 'stateUser'}),
  },
  methods: {
    ...mapActions(['viewImage', 'deleteImage']),
    async removeImage() {
      try {
        await this.deleteImage(this.id);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>