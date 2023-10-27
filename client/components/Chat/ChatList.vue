<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchy, BodyT } from "../../utils/fetchy";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import CreateChat from "./CreateChat.vue";
import router from "../../router";


const { currentUsername } = storeToRefs(useUserStore());
const loaded = ref(false);

const chats = ref<Array<Record<string, string>>>([]);


async function getChats() {
    let response;
    try {
        response = await fetchy(`/api/chats`, "GET");
    } catch {
        return;
    }
    // console.log(response);
    chats.value = response;
}

const goToChat = (chat:any) => {
      // Use Vue Router to navigate to 'CircleActions' page with the circle's data as a route parameter
      router.push({ name: 'SpecificChat', params: { chatId: chat._id } });
    };

onBeforeMount(async () => {
  await getChats();
  loaded.value = true;
});


</script>

<template>
    <CreateChat @refreshChats="getChats()"/>
    <button v-for="chat in chats" :key="chat._id" @click="goToChat(chat)" class="bar">
        <p v-if="currentUsername === chat.user1"> {{ chat.user2 }} </p>
        <p v-else> {{ chat.user1 }} </p>
    </button>
</template>

<style scoped>
.bar {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0; /* Background color for the chat bar */
  border: 1px solid #ddd; /* Border style for the chat bar */
  border-radius: 5px; /* Rounded corners for the chat bar */
  margin-bottom: 10px; /* Spacing between chat bars */
  text-align: left;
  cursor: pointer;
}

.bar:hover {
  background-color: #ddd; /* Background color when hovering over the chat bar */
}
</style>
