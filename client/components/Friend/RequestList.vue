<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["requests"]);
const emit = defineEmits(["refreshRequests", "refreshPending", "refreshFriends"]);
const loaded = ref(false);
const pending = ref<Array<Record<string, string>>>([]);
const requests = ref<Array<Record<string, string>>>([]);

async function getRequests() {
    let response;
    try {
        response = await fetchy(`/api/friend/requests`, "GET");
    } catch (e) {
        console.log(e);
        return;
    }
    console.log(response)
    requests.value = response;
}

async function acceptRequest(from: string) {
    try {
        await fetchy(`/api/friend/accept/${from}`, "PUT");
    } catch (e) {
        console.log(e);
        return;
    }
    emit("refreshRequests");
    emit("refreshFriends");
}

async function rejectRequest(from: string) {
    try {
        await fetchy(`/api/friend/reject/${from}`, "PUT");
    } catch (e) {
        console.log(e);
        return;
    }
    emit("refreshRequests");
}

async function getPending() {
    let response;
    try {
        response = await fetchy(`/api/friend/pending`, "GET");
    } catch (e) {
        console.log(e);
        return;
    }
    pending.value = response;
}

async function removeRequest(to: string) {
    try {
        await fetchy(`/api/friend/requests/${to}`, "DELETE")
    } catch (e) {
        console.log(e);
        return;
    }
    emit("refreshPending");
    await getPending();
}

onBeforeMount(async () => {
  await getRequests();
  await getPending();
  loaded.value = true;
});

</script>

<template>
    <h2> Requests Awaiting Approval </h2>
    <section v-if="loaded">
        <article v-for="request in requests" :key="request._id">
            <p v-if="request.status==='pending'">
                {{ request.from }};
                <button @click="acceptRequest(request.from)">Accept</button>
                <button @click="rejectRequest(request.from)">Reject</button>
            </p>
        </article>
    </section>
    <h2> Pending Requests </h2>
    <section v-if="loaded">
        <article v-for="pend in pending" :key="pend._id">
            <p v-if="pend.status==='pending'">
                {{ pend.to }}
                <button @click="removeRequest(pend.to)">Remove</button>
            </p>
        </article>
    </section>
</template>

<style scoped>

</style>