import axios from 'axios'

const state = {
  notes: null,
  note: null
}

const getters = {
  stateImages: state => state.images,
  stateImage: state => state.image
}

const actions = {
  async createImage ({ dispatch }, image) {
    await axios.post('images', image)
    await dispatch('getImages')
  },
  async getImages ({ commit }) {
    const { data } = await axios.get('images')
    commit('setImages', data)
  },
  async viewImage ({ commit }, id) {
    const { data } = await axios.get(`image/${id}`)
    commit('setImage', data)
  },
  // eslint-disable-next-line no-empty-pattern
  async updateImage ({}, image) {
    await axios.patch(`image/${image.id}`, image.form)
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteImage ({}, id) {
    await axios.delete(`image/${id}`)
  }
}

const mutations = {
  setImages (state, images) {
    state.images = images
  },
  setImage (state, image) {
    state.image = image
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
