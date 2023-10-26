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
    <div>
        <SearchFriend/>
    </div>
    <p></p>
    <div>
        <article v-if= "showFriendList">
            <button @click="toggleView"> View Requests </button>
            <FriendList/>
        </article>
        <article v-else>
            <button @click="toggleView"> View Connections </button>
            <RequestList/>
        </article>
    </div>


</template>




<style scoped>

</style>