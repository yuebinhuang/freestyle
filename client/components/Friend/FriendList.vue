<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["connections"]);
const emit = defineEmits(["refreshFriends"]);
const loaded = ref(false);
const friends = ref<Array<Record<string, string>>>([]);

async function getFriends() {
    let response;
    try {
        response = await fetchy('/api/friends', "GET");
    } catch (e) {
        console.log(e);
        return;
    }
    friends.value = response;
}

async function removeFriend(friend: string) {
    try {
        await fetchy(`/api/friends/${friend}`, "DELETE")
    } catch (e) {
        console.log(e);
        return;
    }
    emit("refreshFriends");
    await getFriends();
}


onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});

</script>

<template>
    <h2> Connections </h2>
    <section v-if="loaded">
        <p v-for="friend in friends" :key="friend._id">
            {{ friend }};
            <button @click="removeFriend(friend.username)">Remove</button>
        </p>
    </section>
</template>

<style scoped>

</style>