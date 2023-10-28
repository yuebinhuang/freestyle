import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import HomeView from "../views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue"
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SettingView from "../views/SettingView.vue";

import ChatView from "@/views/ChatView.vue";
import SpecificChatView from "@/views/SpecificChatView.vue"
import CircleView from "@/views/CircleView.vue";
import CircleActionsView from "@/views/CircleActionsView.vue";
import NewCircleView from "@/views/NewCircleView.vue";
import FeedView from "../views/FeedView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: { requiresAuth: false },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/circles",
      name: "Circles",
      component: CircleView,
      meta: { requiresAuth: true },
    },
    {
      path: "/circles/create",
      name: "NewCircle",
      component: NewCircleView,
      meta: { requiresAuth: true },
    },
    {
      path: "/circles/:circleId",
      name: "CircleActions",
      component: CircleActionsView,
      meta: { requiresAuth: true },
    },

    {
      path: "/chat",
      name: "Chat",
      component: ChatView,
      meta: { requiresAuth: true },
    },
    {
      path: "/chat/:chatId",
      name: "SpecificChat",
      component: SpecificChatView,
      meta: { requiresAuth: true },
    },
    {
      path: "/feed",
      name: "Feed",
      component: FeedView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
