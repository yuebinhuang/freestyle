<script setup lang="ts">
import Configuration from "@/components/Circle/Configuration.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <Configuration :circleId="$route.params.circleId" />
  </main>
</template>