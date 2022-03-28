<template>
  <div>
    <section>
      <h1>Add new image</h1>
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

    <br/><br/>

    <section>
      <h1>Images</h1>
      <hr/><br/>

      <div v-if="images.length">
        <div v-for="image in images" :key="image.id" class="images">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <ul>
                <li><strong>Image Title:</strong> {{ image.title }}</li>
                <li><strong>Author:</strong> {{ image.author.username }}</li>
                <li><router-link :to="{name: 'Image', params:{id: image.id}}">View</router-link></li>
              </ul>
            </div>
          </div>
          <br/>
        </div>
      </div>

      <div v-else>
        <p>Nothing to see. Check back later.</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Dashboard-View',
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  created: function () {
    return this.$store.dispatch('getImages')
  },
  computed: {
    ...mapGetters({ images: 'stateImages' })
  },
  methods: {
    ...mapActions(['createImage']),
    async submit () {
      await this.createImage(this.form)
    }
  }
}
</script>
