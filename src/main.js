import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from 'http-common'
import { UploadMedia, UpdateMedia } from 'vue-media-upload'

const http = http
const app = createApp(App)
app.use(store)
app.use(router)
app.component('upload-media', UploadMedia)
app.component('update-media', UpdateMedia)
app.mount('#app')
