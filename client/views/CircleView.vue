<script setup lang="ts">
import CircleHome from "@/components/Circle/CircleHome.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <CircleHome />
  </main>
</template>