<script setup lang="ts">
import ChatList from "@/components/Chat/ChatList.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Chat Page</h1>
    <ChatList/>
  </main>
</template>