import createPersistedState from "vuex-persistedstate";
import Vue from 'vue';
import Vuex from 'vuex';

import notes from './modules/images';
import users from './modules/users';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    images,
    users,
  },
  plugins: [createPersistedState()]
});