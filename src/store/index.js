import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Page States
const modulePageState = {
  state: {
    sidebarState: true
  },
  mutations: {
    ChangeSidebarState(state) {
      state.sidebarState = !state.sidebarState;
    }
  },
  actions: {
    ChangeSidebarState(context) {
      context.commit('ChangeSidebarState');
    }
  },
  getters: {
    sidebarState: state => {
      return state.sidebarState;
    }
  }
}

export default new Vuex.Store({
  modules: {
    PageState: modulePageState
  }
})
