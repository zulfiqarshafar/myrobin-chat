import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Room from "../views/Room.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/room",
    name: "room",
    component: Room,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
