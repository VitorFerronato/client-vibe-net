import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "",
    redirect: { name: "sign-in" },
  },
  {
    path: "/login/sign-in",
    name: "sign-in",
    component: () => import("../views/LoginView.vue"),
    meta: {
      title: "LOGIN",
      requiresAuth: false,
    },
  },
  {
    path: "/login/sign-up",
    name: "sign-up",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      title: "SIGN UP",
      requiresAuth: false,
    },
  },
  {
    path: "/main/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      title: "HOME",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  console.log(to.meta.requiresAuth, token);
  if (to.meta.requiresAuth && !token) {
    return next("/login/sign-in");
  }

  if (token && (to.path === "/login/sign-in" || to.path === "/login/sign-up")) {
    return next("/main/home");
  }

  document.title = `Vibe Net | ${to.meta.title || ""}`;
  next();
});

export default router;
