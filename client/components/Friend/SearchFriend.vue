<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["refreshPending"]);
const user = ref("")

async function sendRequest(to: string) {
    try {
        await fetchy(`/api/friend/requests/${to}`, "POST");
    } catch (e) {
        console.log(e);
        return;
    }
    emit("refreshPending");
}

</script>

<template>
    <form @submit.prevent="sendRequest(user)">
        <div>
            <p>Send Friend Request</p>
            <input type="text" v-model="user" placeholder="username"/>
            <button type="submit">Send</button>
        </div>

    </form>
</template>

<style scoped>

</style>