<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import router from "../../router";
import Configuration from "./Configuration.vue";
import { RouterLink, RouterView, useRoute } from "vue-router";




const loaded = ref(false);
const circles = ref<Array<Record<string, string>>>([]);

const goToCircleActions = (circle:any) => {
      // Use Vue Router to navigate to 'CircleActions' page with the circle's data as a route parameter
      router.push({ name: 'CircleActions', params: { circleId: circle._id } });
    };


async function getCircles() {
    let response;
    try {
        response = await fetchy('/api/circles', "GET");
    } catch {
        return;
    }
    console.log(response);
    circles.value = response;
}


/* Function to calculate the button style based on the number of members */
function randomCircleStyle(memberCount: number) {
    const size = memberCount * 100; // Adjust the multiplier for size as needed
    const top = Math.floor(Math.random() * 70) + 15 + 'vh'; // Random vertical position
    const left = Math.floor(Math.random() * 70) + 15 + 'vw'; // Random horizontal position
  
    return {
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
    };
  }

onBeforeMount(async () => {
  await getCircles();
  console.log(circles.value);
  loaded.value = true;
});

</script>

<template>
    <div class="circle-container">
      <RouterLink :to="{ name: 'NewCircle' }">
        <button class="circular-button">+</button>
      </RouterLink>
      <section v-if="loaded">
        <button
          v-for="circle in circles"
          :key="circle._id"
          @click="goToCircleActions(circle)"
          class="random-circle"
          :style="randomCircleStyle(circle.members.length)"
        >
          {{ circle.name }}
        </button>
      </section>
    </div>
  </template>
  

<style scoped>
  .circle-container {
    position: relative;
  }
  
.circular-button {
    position: fixed;
    top: 20px; /* Adjust the top distance as needed */
    right: 20px; /* Adjust the right distance as needed */
    width: 60px;
    height: 60px;
    background-color: #3498db; /* Button background color */
    border-radius: 50%; /* Makes it circular */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff; /* Text color */
    font-size: 24px; /* Text size */
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* Hover effect for the button */
.circular-button:hover {
    background-color: #2980b9; /* Change color on hover */
}

  
  .random-circle {
    position: absolute;
    border: 2px solid #0074d9;
    background-color: #0074d9;
    color: #000;
    border-radius: 50%;
    width: 50px; /* Default size */
    height: 50px; /* Default size */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .random-circle:nth-child(odd) {
    background-color: #a4e3e7;
  }
  
  .random-circle:nth-child(even) {
    background-color: #a4e3e7;
  }
  

  </style>
  





