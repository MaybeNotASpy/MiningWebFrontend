<template>
  <section>
    <h1>Edit image</h1>
    <hr/><br/>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input type="text" name="title" v-model="form.title" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content:</label>
        <textarea
          name="content"
          v-model="form.content"
          class="form-control"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EditImage',
  props: ['id'],
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  created: function () {
    this.GetImage()
  },
  computed: {
    ...mapGetters({ image: 'stateNImage' })
  },
  methods: {
    ...mapActions(['updateImage', 'viewImage']),
    async submit () {
      try {
        const image = {
          id: this.id,
          form: this.form
        }
        await this.updateImage(image)
        this.$router.push({ name: 'Image', params: { id: this.image.id } })
      } catch (error) {
        console.log(error)
      }
    },
    async GetImage () {
      try {
        await this.viewImage(this.id)
        this.form.title = this.image.title
        this.form.content = this.image.content
      } catch (error) {
        console.error(error)
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>
