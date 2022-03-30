<template>
  <div>
    <section>
      <h1>Add new image</h1>
      <upload-media 
        server="/image"
        error="@error('media'){{$message}}@enderror">
      </upload-media>
      <hr/><br/>
    </section>

    <br/><br/>

    <section>
      <h1>Images</h1>
      <hr/><br/>

      <div v-if="images?.length">
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
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()

    return {
      created: () => store.dispatch('images/getImages'),
      images: computed(() => store.getters['images/stateImages'])
    }
  }
}
</script>
