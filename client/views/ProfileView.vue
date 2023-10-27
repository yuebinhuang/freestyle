<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import ProfilePage from "@/components/Profile/ProfilePage.vue";
import FriendPage from "@/components/Friend/FriendPage.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="profile-layout">
    <div class="profile-column">
      <h1>Profile Page</h1>
      <ProfilePage />
    </div>
    <div class="friend-column">
      <FriendPage />
    </div>
  </main>
</template>

<style>
.profile-layout {
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 100vh; /* Set the minimum height to 100% of viewport height */
  background-color: #f0f0f0; /* Light gray background color */
}

.profile-column,
.friend-column {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f5f5ff; /* Light blue background color */
}

/* Optional: Add some spacing and styling for the h1 element */
.profile-column h1 {
  margin-bottom: 20px;
  color: #333; /* Dark text color */
}
</style>

