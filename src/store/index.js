import Vue from "vue";
import Vuex from "vuex";
import { db, firebase } from "@/api";
import { firebaseMutations, firebaseAction } from "vuexfire";
import VuexFire from "vuexfire";
Vue.use(Vuex);

const ref = db.ref("/");

const state = {
  listData: [],
  listDataIsLoaded: false
};

const mutations = {
  setListData: (state, list) => (state.listData = list),
  setLoadStatus: (state, status) => state.listDataIsLoaded = status,
  ...firebaseMutations
};

const actions = {
  setDataRef: firebaseAction(async ({ bindFirebaseRef, commit, state }) => {
    await bindFirebaseRef("listData", ref)
    ref.on('value', () => {
      commit('setLoadStatus', true)
    })
  }),
  unsetDataRef: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef("listData", ref);
  }),
  async removeElement(_, id) {
    return await ref.child(id).remove();
  },
  async createElement(_, element) {
    return await ref.push(element)
  },
  async updateElement(_, { id, element }) {
    await ref.child(id).set(element);
  },
  async getSpecificElement(_, id) {
    let snapshot = await ref.child(id).once('value')
    return snapshot.val()
  }
};

const getters = {
  listData: state => state.listData,
  getListData: state => state.listData,
  getStatusLoad: state => state.listDataIsLoaded
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
