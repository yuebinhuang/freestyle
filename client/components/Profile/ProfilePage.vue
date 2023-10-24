<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchy, BodyT } from "../../utils/fetchy";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";

const { currentUsername } = storeToRefs(useUserStore());
// const props = defineProps(["profile"]);
// const updatedProfile = ref( { name: props.profile.name, content: props.profile.content } );
const loaded = ref(false);
let toEdit = ref(true);
const profile = ref();
const newName = ref("");
const newContent = ref();
const emit = defineEmits(["refreshProfile"]);


async function toggleView(){
    toEdit.value = !toEdit.value;
}

async function getProfile(owner: string) {
    let response;
    try {
        response = await fetchy(`/api/profile/${owner}`, "GET");
    } catch {
        return;
    }
    profile.value = response;
}

async function updateProfile(_id: string, update: BodyT) {
    try {
        await fetchy(`/api/profile/update/${profile.value._id}`, "PATCH", {body: update});
    } catch {
        return;
    }
    emit("refreshProfile");
}

onBeforeMount(async () => {
  await getProfile(currentUsername.value);
  loaded.value = true;
});


</script>


<template>

    <section v-if="loaded">
        <button v-if="!toEdit" @click="toggleView"> Update Profile </button>
        <h1> {{ profile.name }} </h1>
        
        <form v-if="toEdit" @submit.prevent="updateProfile(profile._id, {name: newName, content: profile.content})">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newName" placeholder="Enter new profile name" />
            <button type="submit">Update Name</button>
        </form>

        <h2> Whiteboard </h2>
        {{ profile.content }}

        <form v-if="toEdit" @submit.prevent="updateProfile(profile._id, {name: profile.name, content: newContent})">
            <label for="content">Content:</label>
            <textarea id="content" v-model="newContent" placeholder="Enter new profile content"></textarea>
            <button type="submit">Update Content</button>
        </form>
    </section>




</template>




<style scoped>

</style>