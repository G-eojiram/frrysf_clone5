<template>
    <div class="bg-white border rounded-2xl md:flex md:items-center md:justify-between md:space-x-5 p-[2rem] lg:px-[5rem]">
        <div v-for="(profile, index) in profiles" :key="index"
            class="flex items-center space-x-5 sm:justify-center">
            <div class="flex-shrink-0">
                <div class="relative">
                    <img class="h-32 w-32 rounded-full object-cover" :src="profileUrl" alt="profile image " />
                    <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></span>
                </div>
            </div>
            <div class="pt-1.5 lg:pl-[10px]">
                <h1 class="text-2xl font-bold text-gray-900">{{ profile.shelter }}</h1>
                <span class="text-sm font-medium text-gray-500">{{ profile.email }}</span>
            </div>
        </div>
        <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <router-link to="/edit_shelterprofile">
                <button type="button" class="inline-flex justify-center rounded-md bg-white sm:px-[3rem] md:px-[2rem] lg:px-[13px] py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <PencilIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span class="sm:text-[13.5px] md:text-[14px]">Edit Profile</span>
                </button>
            </router-link>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios"; 
import { PencilIcon } from '@heroicons/vue/20/solid'

const id = localStorage.getItem('c_id');
const profiles = ref([]); // Holds shelter and email data
const profileUrl = ref(null); // Holds the image URL

async function loadProfileCard() {
    try {
        const response = await axios.post("http://localhost:5000/edit_shelterprofile", {
            shelterid: id
        });

        if (response.data && response.data.length > 0) {
            response.data.forEach(item => {
                profiles.value.push({
                    shelter: item.shelter,
                    email: item.email,
                    profileurl: item.profile
                });
            });

            try {
                let url = profiles.value[0]?.profileurl;
                const imgResponse = await axios.post("http://localhost:5000/image", {
                    profileUrl: url // Assuming you're using shelterid to fetch the image
                });
                console.log(imgResponse) 
                profileUrl.value = imgResponse.data.data; // Set the profile image URL
            } catch (err) {
                console.error("Error fetching image:", err);
                profileUrl.value = require('@/assets/images/default-profile.png'); // Default image
            }
        } else {
            console.error("No profile data received:", response);
        }
    } catch (err) {
        console.error("An error occurred getting shelter details:", err);
    }
}

onMounted(() => {
    loadProfileCard();
});
</script>
