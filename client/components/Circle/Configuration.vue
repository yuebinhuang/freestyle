
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { fetchy, BodyT } from "../../utils/fetchy";

const loaded = ref(false);
const friends = ref<Array<string>>([]);
const emit = defineEmits(['refreshCircles']);
const props = defineProps(['circleId']);

const availActions = ["Chat", "ViewPost", "ViewPostComments", "Comment", "ViewFeed", "Recommend"];

const circleId = props.circleId;
const circle = ref();
const circleOfFriend = ref();

const newName = ref("");
const members = ref<Array<string>>([]);
const actions = ref<Array<string>>([]);

async function getCircle() {
    let response;
    try {
        response = await fetchy(`/api/circle/${circleId}`, "GET");
        console.log(response)

    } catch {
        return;
    }

    circle.value = response;
    newName.value = response.name;
    console.log("response", response)
    members.value = response.members;
    actions.value = response.actions;
}

async function deleteCircle() {
    try {
        await fetchy(`/api/circle/delete/${circleId}`, "DELETE");
    } catch {
        return;
    }
}


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


async function editCircle(name: string, members: string[], actions: string[]) {
    console.log("name", name);
    console.log('members', members)
    console.log('actions', actions)
    try {
        return await fetchy(`/api/circle/update/${circleId}`, "PATCH", {body: {members: members, name: name, actions: actions}});
    } catch {
        return;
    }
    emit("refreshCircles");
}

const isMember = (friend: string) => members.value.includes(friend);
const isAction = (action: string) => actions.value.includes(action);

const toggleMember = (friend: string) => {
    console.log(friend)
    console.log(members.value)
    if (isMember(friend)) {
        members.value = members.value.filter((member) => member !== friend);
    } else {
        members.value.push(friend);
    }
};

const toggleAction = (action: string) => {
    if (isAction(action)) {
        actions.value = actions.value.filter((act) => act !== action);
    } else {
        actions.value.push(action);
    }
};

onBeforeMount(async () => {
  await getFriends();
  await getCircle();
  console.log(friends);
  loaded.value = true;
});

</script>

<template>
<section v-if="loaded">
    <div class="newName">
        <h2> {{ newName }} </h2>
        <input type="text" v-model="newName" placeholder="Enter new name for circle">
    </div>

    <div class="container">
    <div class="half">
        <div class="section-header">Members: {{ members }}</div>

        <p v-for="friend in friends" :key="friend">
            {{ friend }}
            <label class="toggle-switch">
            <input type="checkbox" @change="toggleMember(friend)" :checked="isMember(friend)">
            <span class="toggle-slider"></span>
            </label>
        </p>
    </div>
    <div class="half">
        <div class="section-header">Actions {{ actions }}</div>
        <div>
        <p v-for="action in availActions" :key="action">
            {{ action }}
            <label class="toggle-switch">
            <input type="checkbox" @change="toggleAction(action)" :checked="isAction(action)">
            <span class="toggle-slider"></span>
            </label>
        </p>
        </div>
    </div>
    </div>
    <RouterLink :to="{ name: 'Circles' }">
        <button class="bottom-left-button" @click="deleteCircle()">Delete Circle</button>
    </RouterLink>
    <RouterLink :to="{ name: 'Circles' }">
        <button class="bottom-right-button" @click="editCircle(newName, members, actions)">Update Circle</button>
    </RouterLink>
</section>
</template>
  
<style scoped>
.newName {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.container {
display: flex;
}

.half {
flex: 1;
padding: 20px;
}

.section-header {
font-size: 20px;
font-weight: bold;
margin-bottom: 10px;
}
  

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.bottom-right-button {
  position: absolute;
  bottom: 50px;
  right: 50px;
}

.bottom-left-button {
  position: absolute;
  bottom: 50px;
  left: 350px;
}

</style>