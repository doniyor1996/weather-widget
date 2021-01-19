import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { weatherAPI, WeatherLocation } from "@/api/openWeatherAPI";

Vue.use(Vuex);

const locations: WeatherLocation[] = [];

export default new Vuex.Store({
  state: {
    lastSync: 0,
    id: 0,
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
      ++state.id;
      location.id = state.id;
      location.order = state.locations.length;
      state.locations.push(location);
    },
    UPDATE_LAST_SYNC(state) {
      state.lastSync = new Date().getTime();
    },
    TOGGLE_SETTINGS(state) {
      state.showSettings = !state.showSettings;
    },
    UPDATE_LOCATION_INFO(state, { locationID, location }) {
      state.locations = state.locations.map(l => {
        if (l.id === locationID) {
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
    addLocation({ commit, dispatch }, location: WeatherLocation) {
      commit("ADD_LOCATION", location);
      dispatch("syncWeatherInfo");
    },
    syncWeatherInfo({ commit, state }) {
      state.locations.forEach(location => {
        if (location.name)
          weatherAPI.getByName(location.name).then(response => {
            console.log(response);
            commit("UPDATE_LOCATION_INFO", {
              locationID: location.id,
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
                locationID: location.id,
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
