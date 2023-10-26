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
  display: flex; /* Use flexbox for layout */
  width: 100%; /* Full width of the viewport */
  justify-content: space-between; /* Center the columns */
}

.profile-column,
.friend-column {
  flex: 1; /* Both columns take up an equal amount of space */
  padding: 20px; /* Add padding for spacing */
  border: 1px solid #ccc; /* Optional: Add borders for separation */
  background-color: #f0f0f0; /* Optional: Set background color */
}

</style>
