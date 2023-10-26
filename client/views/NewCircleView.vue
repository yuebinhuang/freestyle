<script setup lang="ts">
import NewCircle from "@/components/Circle/NewCircle.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <NewCircle />
  </main>
</template>