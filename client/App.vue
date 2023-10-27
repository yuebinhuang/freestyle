<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="title">
        <img src="@/assets/images/wave.png" width="100" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>FreeStyle</h1>
        </RouterLink>
      </div>
      <nav>
        <ul>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Feed' }" :class="{ underline: currentRouteName == 'Feed' }"> Feed </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Profile' }" :class="{ underline: currentRouteName == 'Profile' }"> Connections </RouterLink>
          </li>
          <li v-else>
            <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Circles' }" :class="{ underline: currentRouteName == 'Circles' }"> Circles </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Chat' }" :class="{ underline: currentRouteName == 'Chat' }"> Chat </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
          </li>
          <li v-else>
            <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <header>
        <article v-if="toast !== null" class="toast" :class="toast.style">
          <p>{{ toast.message }}</p>
        </article>
        <RouterView />
      </header>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  width: 250px; /* Adjust the sidebar width as needed */
  background-color: #3a8cde; /* Sidebar background color */
  color: #f2f2f2; /* Text color */
  padding: 20px;
  height: 100vh; /* Set sidebar height to 100% of viewport height */
  overflow-y: auto; /* Add vertical scrollbar if content overflows */
}

.sidebar a {
  color: #fff; /* Set the default text color to white */
  font-size: 20px;
}

/* Active link styles */
.sidebar a:active,
.sidebar a.active {
  color: #000; /* Set the text color to black when the link is clicked (active) */
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.sidebar h1 {
  font-size: 1.5rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.content {
  flex: 1;
  padding: 20px;
}

.underline {
  text-decoration: underline;
}

.toast {
  background-color: #4733ff; /* Toast background color */
  color: #d8dde8; /* Text color */
  padding: 10px;
  border-radius: 5px;
}

/* Media query to adjust the layout for smaller screens */
@media (max-width: 767px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .content {
    padding: 20px;
  }
}
</style>

<style>
body {
  font-family: "Calibri", sans-serif;
}
</style>