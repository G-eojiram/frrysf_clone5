<template>
  <div id="wide"
    class="overflow-hidden bg-white sm:rounded-lg text-gray-400 text-[13px] p-[1rem] sm:px-[4rem] lg:px-[2.5rem] h-fit sm:w-full py-[2rem]">
    <div id="card" class="container sm:max-w-full lg:max-w-[25rem]">
      <div class="mb-[1rem]">
        <span class="text-gray-600 font-semibold text-[14px]">About Shelter</span>
        <ul v-for="item in bio" :key="item.id">
          <span class="break-words">{{ item.info }}</span>
        </ul>
      </div>
      <span class="text-gray-600 font-semibold text-[14px]">More Details</span>
      <ul role="list">
        <li v-for="item in details" :key="item.id" class="py-1 grid grid-cols-[20px_1fr] gap-2">
          <component :is="item.icon" class="w-5 h-5 text-gray-500 mr-2" />
          <span class="break-words">{{ item.label }}</span>
        </li>
      </ul>
      <ul>
        <li v-for="item in sociallink" :key="item.link" class="py-1 grid grid-cols-[20px_1fr] gap-2">
          <LinkIcon class="w-5 h-5 text-gray-500" />
          <a v-if="item.link" :href="item.link" class="cursor-pointer break-words">{{ item.link }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import { PhoneIcon, LinkIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/vue/20/solid";


const bio = ref([
  {
    info: 'test'
  }
])

const sociallink = ref([
  {
    link: 'http://dolendshelter@idkwhatisthis.com',
  },
])

const details = ref([
  {
    icon: MapPinIcon,
    label: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
  },
  {
    icon: PhoneIcon,
    label: '091234567891',
  },
  {
    icon: EnvelopeIcon,
    label: 'dolendshelter@idkwhatisthis.com',
  },
])

async function loadProfileDetails() {
  const id = localStorage.getItem('c_id');

  try {
    const response = await axios.post("http://localhost:5000/edit_shelterprofile", {
      shelterid: id
    });

    // Assuming response.data is an array and you need the first item
    const data = response.data[0];
    console.log(data);

    // Update bio
    bio.value = [
      {
        info: data.bio || 'No bio available.'
      }
    ];

    // Update social links
    sociallink.value = [
      {
        link: data.link || 'No social link available.'
      },
    ];

    // Update details
    details.value = [
      {
        icon: MapPinIcon,
        label: data.address || 'No address available.',
      },
      {
        icon: PhoneIcon,
        label: data.contact ? data.contact.toString() : 'No contact available.',
      },
      {
        icon: EnvelopeIcon,
        label: data.email || 'No email available.',
      },
    ];

  } catch (err) {
    console.error("Error loading profile details:", err);
    // Optionally, you can set default or error messages in your reactive variables here
  }
}


onMounted(() => {
  loadProfileDetails();
});

</script>