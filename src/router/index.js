import Auth from "@aws-amplify/auth";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue"),
  },
  {
    path: "/verify",
    name: "Verify",
    props: true,
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Verify.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/ResetPassword.vue"),
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/activities",
    redirect: "/activities/reminders",
    name: "Activities",
    component: () =>
      import(/* webpackChunkName: "activities" */ "../views/Activities.vue"),
    meta: { requiresAuth: true },
    props: true,
    children: [
      {
        path: "articles/view/:articleId",
        name: "Article",
        component: () =>
          import(
            /* webpackChunkName: "newArticle" */ "../views/Activities/Article.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "articles/edit/:articleId",
        name: "EditArticle",
        component: () =>
          import(
            /* webpackChunkName: "EditArticle" */ "../views/Activities/EditArticle.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "articles",
        name: "Articles",
        component: () =>
          import(
            /* webpackChunkName: "articles" */ "../views/Activities/Articles.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "articles/new",
        name: "NewArticle",
        component: () =>
          import(
            /* webpackChunkName: "newArticle" */ "../views/Activities/NewArticle.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "podcasts",
        name: "Podcasts",
        component: () =>
          import(
            /* webpackChunkName: "podcasts" */ "../views/Activities/Podcasts.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "goals",
        name: "Goals",
        component: () =>
          import(
            /* webpackChunkName: "goals" */ "../views/Activities/Goals.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "reminders",
        name: "Reminders",
        component: () =>
          import(
            /* webpackChunkName: "reminders" */ "../views/Activities/Reminders.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "videos",
        name: "Videos",
        component: () =>
          import(
            /* webpackChunkName: "videos" */ "../views/Activities/Videos.vue"
          ),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/health",
    name: "Health",
    component: () =>
      import(/* webpackChunkName: "health" */ "../views/Health.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/nutrition",
    name: "Nutrition",
    component: () =>
      import(/* webpackChunkName: "nutrition" */ "../views/Nutrition.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/events",
    name: "Events",
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/Events.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/events/new",
    name: "NewEvent",
    component: () =>
      import(/* webpackChunkName: "newEvent" */ "../views/NewEvent.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/events/edit/:eventId",
    name: "EditEvent",
    component: () =>
      import(
        /* webpackChunkName: "editEvent" */ "../views/EditEvent.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
