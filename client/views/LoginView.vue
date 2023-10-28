<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import router from "../router";

const userStore = useUserStore();
const { isLoggedIn, currentUsername } = storeToRefs(userStore);


// onBeforeMount(async () => {
//   void router.push({name: "Profile"});
// });
// onBeforeMount(async () => {
//   console.log(isLoggedIn.value)
//   if(isLoggedIn){
//     router.push({name: 'Profile'});
//   } else {
//     router.push({name: "Login"})
//   }
//   console.log("router", router)
// });

</script>

<template>
  <main class="column">
    <h1>Please login or register!</h1>
    <LoginForm />
    <RegisterForm />
  </main>
</template>
