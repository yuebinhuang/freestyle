<script setup lang="ts">
import ChatComponent from "@/components/Chat/ChatComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <ChatComponent :chatId="$route.params.chatId"/>
  </main>
</template>