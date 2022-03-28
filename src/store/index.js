import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import images from './modules/images'
import users from './modules/users'

export default createStore({
  modules: {
    images,
    users
  },
  plugins: [createPersistedState()]
})
