<template>
    <div class="h-screen flex flex-col">
        <header class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Animal Profile" />
            </div>
            <div class="flex sm:gap-x-1 md:gap-x-4 items-center">
                <div class="bgorange py-[.40rem] px-[2rem] sm:px-[12px] rounded-md hover:bg-lightorange">
                    <RouterLink to="/create_animalprofileform" class="flex gap-x-1 items-center">
                        <FolderPlusIcon class="-ml-0.5 mr-1.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white"
                            aria-hidden="true" />
                        <span class="text-white font-medium text-[13.5px] sm:text-[11px]">Create New Profile</span>
                    </RouterLink>
                </div>
                <div class="flex gap-5">
                    <datetoday />
                </div>
            </div>
        </header>
        <main class="mt-[1rem]">
            <ul id="profile-columns" role="list"
                class="grid gap-6 place-items-center">
                <li v-for="pets in profiles" :key="pets.name"
                    class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg w-full bg-white text-center border drop-shadow-md">
                    <div class="flex flex-1 flex-col p-7">
                        <!-- Image with fallback and error handling -->
                        <img class="mx-auto w-60 h-60 flex-shrink-0 object-cover"
                            :src="pets.imageUrl || default_profile" @error="onImageError($event)"
                            alt="Pet profile picture" />
                        <h3 class="mt-6 text-sm font-medium text-gray-900">{{ pets.name }} </h3>
                        <dl class="mt-1 flex flex-grow flex-col justify-between">
                            <dt class="sr-only">Animal Type</dt>
                            <dd class="text-sm text-gray-500">{{ pets.petType }}</dd>
                        </dl>
                    </div>
                    <div>
                        <div class="text-[14px] bg-slate-50 p-[1rem] hover:bg-lightteal hover:text-white rounded-b-lg">
                            <RouterLink :to="{ name: 'viewanimalprofile', params: { petid: pets.petid } }">
                                <span class="px-[2rem] py-[1rem]">View Profile</span>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
        </main>
        <footer class="mt-auto">
            <linkfooter />
        </footer>
        <Toast ref="toastRef" />
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { FolderPlusIcon } from '@heroicons/vue/20/solid';
import textvalue from '@/components/textString.vue';
import datetoday from '@/components/Shelter/dateCard.vue';
import linkfooter from '@/components/footerLink.vue';
import { useRouter, useRoute } from 'vue-router';
import default_profile from '@/assets/images/default_profile_photo.png';
import Toast from '@/components/toast.vue';  // Ensure correct case for the file name

const toastRef = ref(null);  // Create a ref for the Toast component
const route = useRoute();
const router = useRouter();

const profiles = ref([]);
const id = localStorage.getItem('u_id');
const petid = null;

// Function to load pet profiles
async function loadPetProfiles() {
    try {
        const response = await axios.post("http://localhost:5000/profile", {
            _userid: id,
            _petid: petid
        });

        if (response.data && response.data.length > 0) {
            response.data.forEach(profile => {
                const _name_nickname = profile.name_nickname;
                const [name] = _name_nickname.split('/');
                profiles.value.push({
                    petid: profile.id,
                    name: name,
                    petType: profile.breed,
                    imageUrl: profile.profileurl || ''  // Ensure this is an empty string if no URL
                });
            });
        }
    }
    catch (err) {
        console.log("Error loading profiles: ", err);
    }
}

// Function to handle image load errors (sets to default profile)
function onImageError(event) {
    event.target.src = default_profile;
}

// Load profiles on component mount
onMounted(() => {
    loadPetProfiles();

    console.log("D:")
    if (route.query.showToast && route.query.from == 'create') {
        console.log("D:", route.query)
        const message = route.query.message || 'Pet Profile Saved Successfully';
        if (toastRef.value) {
            toastRef.value.showToast(message);
        }
    }
});
</script>