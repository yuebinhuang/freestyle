<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import ProfilePage from "@/components/Profile/ProfilePage.vue";
import FriendPage from "@/components/Friend/FriendPage.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Profile Page</h1>
    <ProfilePage />
    <FriendPage />
  </main>
</template>