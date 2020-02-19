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

import db from '../scripts/firebaseInit';
const moduleMyUsers = {
  state: {
    users: []
  },
  mutations: {
    GetAllUsers(state) {
      let tempUsers = [];
      db.collection('Users').get().then(snapshot => [
        snapshot.forEach(doc => {
            const data = {
                'id': doc.id,
                'name': doc.data().name,
                'age': doc.data().age,
                'contactNumber': doc.data().contactNumber,
                'location': doc.data().location,
                'occupation': doc.data().occupation,
                'student': doc.data().student,
                'teacher': doc.data().teacher,
                'description': doc.data().description,  
            }
            tempUsers.push(data);
        })
      ])
      state.users = tempUsers;
    }
  },
  actions: {
    GetAllUsers(context) {
      context.commit('GetAllUsers');
    }
  },
  getters: {
    GetAllUsers(state) {
      return state.users;
    }
  }
}

export default new Vuex.Store({
  modules: {
    PageState: modulePageState,
    Users: moduleMyUsers
  }
})
