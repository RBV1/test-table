import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

// Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ElementDetails from "@/pages/ElementDetails";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: "/:id(\\d+)",
    name: 'ElementDetails',
    component: ElementDetails,
    props: true
  },
  {
    path: "*",
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
