<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchy, BodyT } from "../../utils/fetchy";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import { stringifyQuery } from "vue-router";
import LoginFormVue from "../Login/LoginForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
// const props = defineProps(["profile"]);
// const updatedProfile = ref( { name: props.profile.name, content: props.profile.content } );
const loaded = ref(false);
let toEdit = ref(false);
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
    console.log("hello", update);
    try {
        await fetchy(`/api/profile/update/${profile.value._id}`, "PATCH", { body: {update: update }});
    } catch {
        return;
    }
    emit("refreshProfile");
    // After updating the profile, refresh the profile and toggle the view!
    await getProfile(currentUsername.value);
    await toggleView();
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
        <div class="content-box">
            {{ profile.content }}
        </div>

        <form v-if="toEdit" @submit.prevent="updateProfile(profile._id, {name: profile.name, content: newContent})">
            <label for="content">Content:</label>
            <textarea id="content" v-model="newContent" placeholder="Enter new profile content"></textarea>
            <button type="submit">Update Content</button>
        </form>
    </section>




</template>




<style scoped>
.content-box {
  border: 2px solid #ccc; /* Add a border */
  padding: 10px; /* Add padding for spacing inside the box */
  margin: 10px 0; /* Add margin for spacing around the box */
  height: 200px; /* Set a specific height, adjust as needed */
}
</style>