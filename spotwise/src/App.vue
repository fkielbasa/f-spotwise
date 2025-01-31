<template>
  <div class="flex h-screen w-screen">
    <SideMenu
        :days="days"
        :selectedDay="selectedDay"
        :totalTime="totalTime"
        :totalDistance="totalDistance"
        @update-selected-day="updateSelectedDay"
    />

    <MapView
        :pointsOfInterest="filteredPoints"
        :center="center"
        :selectedDay="selectedDay"
        class="flex-1"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SideMenu from "@/components/SideMenu.vue";
import MapView from "@/components/MapView.vue";
import { getTripData } from "@/api/poisApi.ts";
import type { TripResponse, PointOfInterest, TripDay } from "@/types/trip.ts";

const days = ref<TripDay[]>([]);
const pointsOfInterest = ref<PointOfInterest[]>([]);
const selectedDay = ref<string | null>(null);
const totalTime = ref<number | null>(null);
const totalDistance = ref<number | null>(null);
const center = ref<[number, number] | null>(null);

const filteredPoints = computed(() => {
  if (selectedDay.value) {
    const day = days.value.find((d) => d.day === selectedDay.value);
    return day ? day.dayData.pointsOfInterest : [];
  }
  return [];
});

const updateSelectedDay = (day: string) => {
  const selected = days.value.find((d) => d.day === day);
  if (selected) {
    selectedDay.value = day;
    totalTime.value = selected.dayData.totalTime;
    totalDistance.value = selected.dayData.totalDistance;
    pointsOfInterest.value = selected.dayData.pointsOfInterest;

    if (selected.dayData.pointsOfInterest.length > 0) {
      center.value = [
        selected.dayData.pointsOfInterest[0].latitude,
        selected.dayData.pointsOfInterest[0].longitude,
      ];
    } else {
      center.value = null;
    }
  }
};

const fetchTripData = async () => {
  try {
    const tripData: TripResponse = await getTripData();

    if (tripData.days.length > 0) {
      days.value = tripData.days;

      updateSelectedDay(tripData.days[0].day);
    }
  } catch (error) {
    console.error("Error fetching trip data:", error);
  }
};

onMounted(fetchTripData);
</script>
