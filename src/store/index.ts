import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { weatherAPI, WeatherLocation } from "@/api/openWeatherAPI";

Vue.use(Vuex);

const locations: WeatherLocation[] = [];

export default new Vuex.Store({
  state: {
    lastSync: 0,
    locations,
    showSettings: false
  },
  getters: {
    locations: state => state.locations,
    lastSync: state => state.lastSync,
    showSettings: state => state.showSettings
  },
  mutations: {
    ADD_LOCATION(state, location: WeatherLocation) {
      location.order = state.locations.length;
      state.locations.push(location);
    },
    DELETE_LOCATION(state, id) {
      state.locations = state.locations.filter(l => l.id !== id);
    },
    UPDATE_LAST_SYNC(state) {
      state.lastSync = new Date().getTime();
    },
    TOGGLE_SETTINGS(state) {
      state.showSettings = !state.showSettings;
    },
    UPDATE_LOCATION_INFO(state, { location }) {
      state.locations = state.locations.map(l => {
        if (l.id === location.id) {
          l = { ...location };
        }
        return l;
      });
    }
  },
  actions: {
    toggleSettings({ commit }) {
      commit("TOGGLE_SETTINGS");
    },
    addLocation({ commit, dispatch, state }, location: WeatherLocation) {
      if (state.locations.filter(l => l.id === location.id).length) {
        alert("This location is already exist");
        return;
      }
      commit("ADD_LOCATION", location);
      dispatch("syncWeatherInfo");
    },
    deleteLocation({ commit }, id) {
      commit("DELETE_LOCATION", id);
    },
    syncWeatherInfo({ commit, state }) {
      state.locations.forEach(location => {
        if (location.name)
          weatherAPI.getById(location.id).then(response => {
            console.log(response);
            commit("UPDATE_LOCATION_INFO", {
              location: response
            });
          });
        else if (location.coord)
          weatherAPI
            .getByCoordinates({
              lat: location.coord.lat,
              lon: location.coord.lon
            })
            .then(response => {
              commit("UPDATE_LOCATION_INFO", {
                location: response
              });
            });
      });
      commit("UPDATE_LAST_SYNC");
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
