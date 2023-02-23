import { Auth } from "@aws-amplify/auth";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

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
        meta: { requiresAuth: true, requiresEditor: true },
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
        meta: { requiresAuth: true, requiresEditor: true },
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
      {
        path: "photos",
        name: "Photos",
        component: () =>
          import(
            /* webpackChunkName: "photos" */ "../views/Activities/Photos.vue"
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
    redirect: "/events/live-events",
    name: "Events",
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/Events.vue"),
    meta: { requiresAuth: true },
    props: true,
    children: [
      {
        path: "live-events",
        name: "LiveEvents",
        component: () =>
          import(
            /* webpackChunkName: "live-events" */ "../views/Events/LiveEvents.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "live-events/new",
        name: "NewEvent",
        component: () =>
          import(
            /* webpackChunkName: "newLiveEvent" */ "../views/Events/NewLiveEvent.vue"
          ),
        meta: { requiresAuth: true, requiresEditor: true },
      },
      {
        path: "live-events/:eventId",
        name: "Event",
        component: () =>
          import(
            /* webpackChunkName: "liveEvent" */ "../views/Events/LiveEvent.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "live-events/edit/:eventId",
        name: "EditEvent",
        component: () =>
          import(
            /* webpackChunkName: "editLiveEvent" */ "../views/Events/EditLiveEvent.vue"
          ),
        meta: { requiresAuth: true, requiresEditor: true },
      },
      {
        path: "competitions",
        name: "Competitions",
        component: () =>
          import(
            /* webpackChunkName: "competitions" */ "../views/Events/Competitions.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "competitions/new",
        name: "NewCompetition",
        component: () =>
          import(
            /* webpackChunkName: "newCompetitions" */ "../views/Events/NewCompetition.vue"
          ),
        meta: { requiresAuth: true, requiresEditor: true },
      },
      {
        path: "competitions/:competitionId",
        name: "Competition",
        component: () =>
          import(
            /* webpackChunkName: "competition" */ "../views/Events/Competition.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "competitions/edit/:competitionId",
        name: "EditCompetition",
        component: () =>
          import(
            /* webpackChunkName: "editCompetition" */ "../views/Events/EditCompetition.vue"
          ),
        meta: { requiresAuth: true, requiresEditor: true },
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/page-not-found",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "pageNotFound" */ "../views/PageNotFound.vue"
      ),
  },
  {
    path: "/not-authorized",
    name: "NotAuthorized",
    component: () =>
      import(
        /* webpackChunkName: "notAuthorized" */ "../views/NotAuthorized.vue"
      ),
  },
  {
    path: "*",
    redirect: "/page-not-found",
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
  const requiresEditor = to.matched.some(
    (record) => record.meta.requiresEditor
  );
  let isEditor = false;
  let currentUserInfo = null;

  if (store.getters.isEditor) {
    isEditor = store.getters.isEditor;
    currentUserInfo = store.getters.user;
  } else {
    currentUserInfo = await Auth.currentUserInfo();
    if (currentUserInfo) {
      const userCredentials = await Auth.currentAuthenticatedUser();
      const groups =
        userCredentials.signInUserSession.accessToken.payload[
          "cognito:groups"
        ] || [];
      isEditor = groups.includes("Editors");
    }
  }

  if (requiresAuth && requiresEditor && !isEditor && currentUserInfo) {
    next("/not-authorized");
  } else if (requiresAuth && !currentUserInfo) {
    next("/login");
  } else if (requiresAuth && Object.keys(currentUserInfo).length == 0) {
    next("/login");
  } else {
    next();
  }
});

export default router;
