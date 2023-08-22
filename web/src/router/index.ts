import { createRouter, createWebHashHistory } from "vue-router";
import {i18n} from '../locales'

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "app.homeTitle",
      keepAlive: true,
    },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/post",
    name: "post",
    meta: {
      title: "app.postDetailsTitle",
    },
    component: () => import("@/views/Post.vue"),
  },
  {
    path: "/topic",
    name: "topic",
    meta: {
      title: "sidebar.topic",
    },
    component: () => import("@/views/Topic.vue"),
  },
  // {
  //   path: "/anouncement",
  //   name: "anouncement",
  //   meta: {
  //     title: "announcement",
  //   },
  //   component: () => import("@/views/Anouncement.vue"),
  // },
  {
    path: "/profile",
    name: "profile",
    meta: {
      title: "sidebar.profile",
    },
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/u",
    name: "user",
    meta: {
      title: "userDetails",
    },
    component: () => import("@/views/User.vue"),
  },
  {
    path: "/messages",
    name: "messages",
    meta: {
      title: "sidebar.message",
    },
    component: () => import("@/views/Messages.vue"),
  },
  {
    path: "/collection",
    name: "collection",
    meta: {
      title: "sidebar.collection",
    },
    component: () => import("@/views/Collection.vue"),
  },
  {
    path: "/contacts",
    name: "contacts",
    meta: {
      title: "sidebar.friend",
    },
    component: () => import("@/views/Contacts.vue"),
  },
  {
    path: "/following",
    name: "following",
    meta: {
      title: "tabs.follow",
    },
    component: () => import("@/views/Following.vue"),
  },
  // {
  //   path: "/wallet",
  //   name: "wallet",
  //   meta: {
  //     title: i18n.global.t("wallet"),
  //   },
  //   component: () => import("@/views/Wallet.vue"),
  // },
  {
    path: "/setting",
    name: "setting",
    meta: {
      title: "sidebar.settings",
    },
    component: () => import("@/views/Setting.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
    },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${i18n.global.t(to.meta.title as string)} | ${i18n.global.t('app.name')}`;
  next();
});

export default router;
