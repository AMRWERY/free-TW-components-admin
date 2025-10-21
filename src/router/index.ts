import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/components",
      name: "components",
      component: () => import("../views/components.vue"),
      meta: { title: "Components" },
    },
    {
      path: "/add-category",
      name: "add-category",
      component: () => import("../views/add-category.vue"),
      meta: { title: "Add Category" },
    },
  ],

  scrollBehavior() {
    return { top: 0, left: 0, behavior: "instant" };
  },
});

router.afterEach((to) => {
  const titleKey = to.meta.title as string;
  document.title = titleKey || "Admin Dashboard";
});

export default router;
