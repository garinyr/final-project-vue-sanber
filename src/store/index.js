import Vue from "vue";
import Vuex from "vuex";

import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "sanbercode",
  storage: localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {},
});
