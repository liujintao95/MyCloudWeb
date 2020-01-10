import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    url_prefix: "http://127.0.0.1:5000"
  },
  mutations: {
    loadchange(state) {
      if (state.loading == false) {
        state.loading = true;
      } else {
        state.loading = false;
      }
    }
  },
  actions: {}
});
