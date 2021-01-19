import Vue from "vue";
import App from "./App.vue";
import wrap from "@vue/web-component-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/style.scss";

Vue.config.productionTip = false;

const CustomEl = wrap(Vue, App);

window.customElements.define("weather-widget", CustomEl);
