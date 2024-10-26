<template>
  <div class="map-container" :style="{ height: containerHeight, width: containerWidth }" :id="mapId"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import paw from "@/assets/images/pawcator-icon-beta.png";
import "leaflet-control-geocoder";
import { LanguageIcon } from '@heroicons/vue/24/outline';

// Props definition
const props = defineProps({
  containerHeight: {
    type: String,
    default: "70vh",
  },
  containerWidth: {
    type: String,
    default: "100%",
  },
  shelterlat: {
    type: Number,
    required: false,
  },
  shelterlng: {
    type: Number,
    required: false,
  },
});

// Emit event for marker-added
const emit = defineEmits(['location-changed']);

// State variables
const map = ref(null);
const marker = ref(null);
const user_lat = ref(10.3157);
const user_long = ref(123.8854);
const zoomLevel = 17;
const marked_address = ref("");
const mapId = `map-${Math.random().toString(36).substr(2, 9)}`;
const pawIcon = L.icon({
  iconUrl: paw,
  iconSize: [100, 100],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// Watch for changes in shelterlat and shelterlng props and reinitialize map
// watch([() => props.shelterlat, () => props.shelterlng], ([newLat, newLng]) => {
//   if (newLat && newLng) {
//     initializeMap(newLat, newLng);
//   }
// });

//old code of jeneh change to new code of salpocial
// Initialize map on component mount
// onMounted(() => {
//   getLocation();
// }); by jeneh

// new added line changes on onMounted(()
// Initialize map on component mount
onMounted(async () => {
  getLocation(); // Get user's location first
  await fetchShelters(); // Fetch shelter data afterwards
});
// end of new added line changes on onMounted(()) - from salpocial's code


// Clean up map when the component is unmounted
onBeforeUnmount(() => {
  if (map.value) {
    map.value.off();
    map.value.remove();
    map.value = null;
  }
});

// start of added new line - salpocial code
// Function to fetch shelters data from the backend
const fetchShelters = async () => {
  try {
    const response = await fetch('http://localhost:5000/shelters');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log("Fetched shelter data:", data);
    shelters.value = data; // Set the fetched data to shelters array

    // Check if map is initialized before adding markers
    if (map.value) {
      addShelterMarkers(); // Call the function to add markers
    } else {
      console.warn("Map is not initialized yet.");
    }
  } catch (error) {
    console.error("Error fetching shelter data:", error);
  }
};

// Function to add shelter markers to the map
const addShelterMarkers = async () => {
  for (const shelter of shelters.value) {
    const lat = parseFloat(shelter.latitude); // Convert to float if necessary
    const lng = parseFloat(shelter.longitude); // Convert to float if necessary
    if (!isNaN(lat) && !isNaN(lng) && shelter.shelter_name) { // Ensure valid coordinates
      const shelterMarker = L.marker([lat, lng], { icon: pawIcon }).addTo(map.value);

      // Update the popup content to include both name and address
      const popupContent = `
                <strong>${shelter.shelter_name}</strong><br>
                Address: ${shelter.address ? shelter.address : 'Address not available'}
            `;
      shelterMarker.bindPopup(popupContent);
    } else {
      console.warn("Invalid coordinates for shelter:", shelter);
    }
  }
};
// end of added new line - salpocial code

// Initialize the map function
const initializeMap = (lat, lng) => {

  if (map.value) {
    map.value.setView([lat, lng], zoomLevel);
    return;
  }

  map.value = L.map(mapId).setView([lat, lng], zoomLevel);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map.value);

  map.value.addControl(new L.Control.Fullscreen());
  map.value.on("click", addMarker);
};

// Add marker function
const addMarker = async (e) => {

  if (marker.value) {
    map.value.removeLayer(marker.value);
  }

  const lat = e?.latlng ? e.latlng.lat : user_lat.value;
  const lng = e?.latlng ? e.latlng.lng : user_long.value;

  user_lat.value = lat;
  user_long.value = lng;

  marker.value = L.marker([lat, lng], { icon: pawIcon }).addTo(map.value);

  const address = await getAddress(lat, lng);
  if (address) {
    marker.value.bindPopup(`Address: ${address}`).openPopup();
  } else {
    marker.value.bindPopup(`Coordinates: ${lat}, ${lng}`).openPopup();
  }

  // Emit the location-changed event
  emit('location-changed', {
    address: marked_address.value,
    lat: user_lat.value,
    lng: user_long.value,
  });
};

// Get user's current location
const getLocation = () => {
  if (props.shelterlat && props.shelterlng) {
    initializeMap(props.shelterlat, props.shelterlng);
    addMarker({
      latlng: { lat: props.shelterlat, lng: props.shelterlng },  // Corrected this line
    });
  }
  else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        user_lat.value = position.coords.latitude;
        user_long.value = position.coords.longitude;
        initializeMap(user_lat.value, user_long.value);
        addMarker({
          latlng: { lat: user_lat.value, lng: user_long.value },
        });
      },
      () => {
        console.warn(
          "Geolocation access denied or failed. Using default location."
        );
        initializeMap(user_lat.value, user_long.value);
      }
    );
  } else {
    console.warn(
      "Geolocation is not supported by this browser. Using default location."
    );
    initializeMap(user_lat.value, user_long.value);
  }
};

// Fetch the address using reverse geocoding
const getAddress = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Furry-Safe/1.0 (jinnkin21@gmail.com)",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    marked_address.value = data.display_name;
    return data.display_name;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};
</script>

<style scoped>
.map-container {
  height: 70vh;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.modal-wrapper {
  z-index: 1050;
  position: relative;
}

address-display {
  z-index: 1051;
  margin-bottom: 10px;
}
</style>
