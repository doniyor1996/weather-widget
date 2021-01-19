<template>
  <div class="app-header d-flex justify-content-between">
    <div>{{ appTitle }}</div>
    <div class="d-flex" v-if="showSettings">
      <CloseIcon class="icon" @click="toggleSettings" />
    </div>
    <div class="d-flex" v-else>
      <div @click="syncWeatherInfo" class="mr-2" :title="syncAt">
        <RefreshIcon class="icon" />
      </div>
      <div>
        <SettingIcon class="icon" @click="toggleSettings" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SettingIcon from "@/assets/settings.svg";
import RefreshIcon from "@/assets/refresh.svg";
import CloseIcon from "@/assets/close.svg";
import { APP_TITLE } from "@/appConstants";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  mounted() {
    this.updateSyncText();
    if (this.showSettings) {
      this.toggleSettings();
    }
    setInterval(() => {
      this.updateSyncText();
    }, 5000);
  },
  components: {
    SettingIcon,
    RefreshIcon,
    CloseIcon
  },
  data() {
    return {
      appTitle: APP_TITLE,
      syncAt: ""
    };
  },
  computed: {
    ...mapGetters(["showSettings", "lastSync"])
  },
  watch: {
    lastSync() {
      this.updateSyncText();
    }
  },
  methods: {
    ...mapActions(["addLocation", "syncWeatherInfo", "toggleSettings"]),

    updateSyncText() {
      const time = new Date().getTime() - this.lastSync;
      const minutesAgo = new Date(time).getMinutes();
      this.syncAt =
        minutesAgo <= 1
          ? "Recently updated"
          : `Updated ${minutesAgo} minutes ago`;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.app-header {
  background-color: $gray;
  padding: 5px 10px;
  border-radius: 10px 10px 0 0;
  align-items: center;
}
</style>
