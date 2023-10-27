<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const receiver = ref("");
const content = ref("");
const emit = defineEmits(["refreshChats"]);


async function createChat(receiver: string) {
    try {
        await fetchy(`/api/chat/create`, "POST", {body: {receiver: receiver, content: content.value}});
    } catch {
        return;
    }
    emit("refreshChats");
    emptyChat()
}

const emptyChat = () => {
  content.value = "";
};

</script>

<template>
  <form @submit.prevent="createChat(receiver)">
    <input type="text" v-model="receiver" placeholder="Connection to Start Chat with" required>
    <label for="content">Chat Message:</label>
    <textarea id="content" v-model="content" placeholder="Start a new chat!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Start Chat</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>