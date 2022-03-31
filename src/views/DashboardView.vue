<template>
  <div>
    <section>
      <h1>Add new image</h1>
      <file-pond
        name="test"
        ref="pond"
        allow-multiple="true"
        v-bind:server="myServer"
        v-bind:files="myFiles"
        accepted-file-types="image/jpeg, image/png, image/webp"
        v-on:init="handleFilePondInit"
      />
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
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
)

export default {
  setup () {
    const store = useStore()

    const myServer = {
      process: (fieldName, file, metadata, load) => {
        // simulates uploading a file
        setTimeout(() => {
          load(Date.now())
        }, 1500)
      },
      load: (source, load) => {
        // simulates loading a file from the server
        fetch(source)
          .then((res) => res.blob())
          .then(load)
      }
    }

    const myFiles = []

    function handleFilePondInit () {
      // FilePond
      console.log('FilePond has initialized')
    }

    return {
      FilePond,
      myServer,
      myFiles,
      handleFilePondInit,
      created: () => store.dispatch('images/getImages'),
      images: computed(() => store.getters['images/stateImages'])
    }
  },
  components: {
    FilePond
  }
}
</script>
