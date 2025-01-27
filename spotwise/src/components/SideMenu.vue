<template>
  <div
      :class="[ 'h-full bg-gray-100 dark:bg-gray-700 transition-all duration-300 flex flex-col', isCollapsed ? 'w-10' : 'w-1/4 max-w-xs' ]"
  >
    <button @click="toggleMenu" class="text-white flex justify-end p-4 cursor-pointer hover:bg-gray-600 transition-colors">
      ☰
    </button>

    <div v-show="!isCollapsed" class="flex-1 p-4 overflow-auto flex flex-col justify-between">
      <ul class="flex flex-col gap-4">
        <li
            v-for="(day, index) in days"
            :key="index"
            @click="$emit('update-selected-day', day.day)"
            :class="[
            'cursor-pointer py-3 px-4 rounded-md text-lg font-semibold transition-all',
            selectedDay === day.day ? 'bg-gray-400 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          ]"
        >
          {{ day.day }}
        </li>
      </ul>

      <div v-if="totalTime !== null && totalDistance !== null" class="bg-gray-600 text-white p-4 rounded-md">
        <div class="text-xl">Total Time: {{ isFinite(totalTime) ? convertMinutesToHours(totalTime) : '0.00' }}</div>
        <div class="text-xl">Total Distance: {{ isFinite(totalDistance) ? totalDistance.toFixed(2) : '0.00' }} km</div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  return `${hours}h ${remainingMinutes}m`;
};

const props = defineProps({
  days: {
    type: Array,
    required: true,
  },
  selectedDay: {
    type: String,
    default: null,
  },
  totalTime: {
    type: Number,
    default: null,
  },
  totalDistance: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update-selected-day"]);

const isCollapsed = ref(false);

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
