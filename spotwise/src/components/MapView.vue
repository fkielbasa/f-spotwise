<template>
  <div class="w-full h-full relative">
    <l-map
        v-if="center"
        v-model:zoom="zoom"
        :center="center"
        class="w-full h-full"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker
          v-for="(point, index) in pointsOfInterest"
          :key="index"
          :lat-lng="[point.latitude, point.longitude]"
          :icon="getIcon(selectedDay, index + 1)"
      >
        <l-popup>
          <strong>{{ point.name }}</strong><br />
          {{ point.category }}<br />
          Reviews: {{ point.reviewCount }}<br />
          Rating: {{ point.rating }} ⭐
        </l-popup>
      </l-marker>
    </l-map>

    <div v-else class="flex items-center justify-center h-full">
      <p class="text-lg font-bold">Ładowanie mapy...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import { ref, computed } from "vue";
import type { PointOfInterest } from "@/types/trip.ts";

const props = defineProps({
  pointsOfInterest: {
    type: Array as () => PointOfInterest[],
    required: true,
  },
  center: {
    type: Array ,
    default: null,
  },
  selectedDay: {
    type: String,
    required: true,
  },
});

const zoom = ref(13);

const getIcon = (day: string, number: number) => {

  const icon = new L.DivIcon({
    className: "custom-marker",
    html: `
      <div style="position: relative;">
        <img src="/images/marker.png"
           >
        <span style="position: absolute; top: 4px; left: 7px; color: white; font-weight: bold; font-size: 16px;">
          ${number}
        </span>
      </div>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -34],
  });

  return icon;
};
</script>

<style scoped>
.custom-marker img {
  border-radius: 50%;
  color: aqua;
}
</style>
