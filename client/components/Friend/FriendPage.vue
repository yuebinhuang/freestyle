<script setup lang="ts">
import { ref } from "vue";
import FriendList from "./FriendList.vue";
import RequestList from "./RequestList.vue";
import SearchFriend from "./SearchFriend.vue";

let showFriendList = ref(true);

async function toggleView(){
    showFriendList.value = !showFriendList.value;
}

</script>


<template>

    <SearchFriend/>
    <div>
        <p></p>
        <article v-if= "showFriendList">
            <button @click="toggleView"> View Requests </button>
            <FriendList @refreshFriends = getFriends()/>
        </article>
        <article v-else>
            <button @click="toggleView"> View Connections </button>
            <RequestList @refreshRequests = getRequests() @refreshPending = getPending() @refreshFriends = getFriends()/>
        </article>
    </div>


</template>




<style scoped>

</style>