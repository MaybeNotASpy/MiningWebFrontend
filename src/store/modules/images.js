import axios from 'axios'

const state = {
  images: null,
  image: null
}

const getters = {
  stateImages: state => state.images,
  stateImage: state => state.image
}

const actions = {
  async createImage ({ dispatch }, image, onUploadProgress) {
    let formData = new FormData()
    formData.append('file', image)

    let response = await axios.post('images', formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    })
    await dispatch('getImages')
    return response
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
