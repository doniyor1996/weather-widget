import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { weatherAPI } from "@/api/openWeatherAPI";

Vue.use(Vuex);

interface Location {
  id: number;
  order: number;
  coord?: {
    lon: number;
    lat: number;
  };
  name: string;
  info: object;
}

const locations: Location[] = [];

export default new Vuex.Store({
  state: {
    lastSync: 0,
    id: 0,
    locations,
    appLabel: "state app label::"
  },
  getters: {
    locations: state => state.locations,
    lastSync: state => state.lastSync
  },
  mutations: {
    ADD_LOCATION(state, location: Location) {
      ++state.id;
      location.id = state.id;
      location.order = state.locations.length;
      state.locations.push(location);
    },
    UPDATE_LAST_SYNC(state) {
      state.lastSync = new Date().getTime();
    },
    UPDATE_LOCATION_INFO(state, { locationID, info }) {
      state.locations = state.locations.map(location => {
        if (location.id === locationID) {
          location.info = info;
          location.name = info.name + ", " + info.sys.country;
        }
        return location;
      });
    }
  },
  actions: {
    addLocation({ commit, dispatch }, location: Location) {
      commit("ADD_LOCATION", location);
      dispatch("syncWeatherInfo");
    },
    syncWeatherInfo({ commit, state }) {
      state.locations.forEach(location => {
        if (location.name)
          weatherAPI.getByName(location.name).then(response => {
            commit("UPDATE_LOCATION_INFO", {
              locationID: location.id,
              info: response
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
                info: response
              });
            });
      });
      commit("UPDATE_LAST_SYNC");
    },
    updateForce({ commit, dispatch }) {
      commit("UPDATE_LAST_SYNC");
      dispatch("syncWeatherInfo");
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
