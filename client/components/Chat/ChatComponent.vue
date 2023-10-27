<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import LoginFormVue from "../Login/LoginForm.vue";

const { currentUsername } = storeToRefs(useUserStore());

const props = defineProps(["chatId"]);
const emit = defineEmits(["refreshChats"])
const chatId = props.chatId;
const loaded = ref(false);

const chat = ref();
const user1 = ref("");
const user2 = ref("");
const message = ref("");
const messages = ref<Array<Record<string, string>>>([]);

const sender = ref("");
const receiver = ref("");




async function getChat() {
    console.log("hello", receiver)
    let response;
    try {
        response = await fetchy(`/api/chat/${chatId}`, "GET");
    } catch {
        return;
    }
    console.log(response);
    chat.value = response;
    user1.value = response.user1;
    user2.value = response.user2;
    messages.value = response.content;

    if (user1 === currentUsername) {
        sender.value = user1.value;
        receiver.value = user2.value;
    } else {
        sender.value = user2.value;
        receiver.value = user1.value;
    }
}

async function sendMessage() {
    console.log("bruh", receiver.value);
    console.log(`/api/chat/send/${receiver.value}`)
    try {
        await fetchy(`/api/chat/send/${receiver.value}`, "PATCH", {body: {content: message.value}})
    } catch {
        return;
    }
    emit("refreshChats");
}

onBeforeMount(async () => {
  await getChat();
  console.log("new", messages.value);
  loaded.value = true;
});

</script>

<template>
    <h2 v-if="user1 === currentUsername"> Chat with {{ user2 }} </h2>
    <h2 v-else> Chat with {{ user1 }} </h2>
    <article v-for="message in messages">
        <div v-if="currentUsername === message[0]" class="sent">
            <p>{{ message[1] }}</p>
        </div>
        <div v-else class ="received">
            <p>{{ message[1] }}</p>
        </div>
    </article>
    <form @submit.prevent="sendMessage()">
        <textarea id="message" v-model="message" placeholder="Send a message!" required> </textarea>
        <button type="submit" class="pure-button-primary pure-button">Send Message</button>
    </form>    
</template>

<style scoped>
.sent {
  align-self: flex-end;
  background-color: #0074d9; /* Blue background for sent messages */
  color: #fff; /* White text color for sent messages */
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}

.received {
  align-self: flex-start;
  background-color: #ccc; /* Light gray background for received messages */
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}

/* Additional styling for the form, textarea, and button goes here */
</style>

