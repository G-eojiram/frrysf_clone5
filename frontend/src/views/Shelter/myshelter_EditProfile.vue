<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { PhotoIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, LinkIcon } from '@heroicons/vue/24/solid';
import prompt from '@/components/prompt_savechange.vue';
import { useRouter, useRoute } from 'vue-router';

import Toast from '@/components/toast.vue';  // Ensure correct case for the file name
import mapoverlay from '@/components/pin_MapModal.vue'

const showMapModal = ref(false)
const route = useRoute();
const router = useRouter();
const toastRef = ref(null);  // Create a ref for the Toast component
const isModalpromptOpen = ref(false);

const id = localStorage.getItem('c_id');
const lat = ref('');
const lng = ref('');
const shelterName = ref('');
const about = ref('');
const shelterAddress = ref('');
const Phone = ref('');
const email = ref('');
const links = ref([{ value: '' }]);
const url = ref('');

const fileInput = ref(null);
const selectedImage = ref(null);
let fileToUpload = null;

// Navigation function
function navigateTo(path) {
    router.push(path);
}

// Toggle modal visibility
function showPrompt() {
    isModalpromptOpen.value = true;
}

function handleSaveClick() { //click ni sa prompt
    console.log('Save button clicked!');
    // Perform actions when the Save button is clicked
}

function handleFileChange(event) {
    const file = event.target.files[0];
    fileToUpload = file;

    const reader = new FileReader();
    reader.onload = (event) => {
        selectedImage.value = event.target.result;
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    selectedImage.value = null;
    fileToUpload = null;

    if (fileInput.value) {
        fileInput.value.value = '';
    }
}

function addLink() {
    console.log('Add link button clicked');
    links.value.push({ value: '' });
    console.log('Links array:', links.value);
}

function removeLink(index) {
    links.value.splice(index, 1);
}

// Retrieve data from the backend based on localStorage c_id 
async function get_Shelter_Details() {
    try {
        const response = await axios.post("http://localhost:5000/edit_shelterprofile", {
            shelterid: id
        });

        console.log(response.data[0])
        if (response.data) {
            populateForm(response.data[0]);
        }
    }
    catch (err) {
        console.log("An error occurred getting shelter details", err);
    }
}

// Populate the interface with the retrieved data 
async function populateForm(data) {
    shelterName.value = data.shelter || '';
    about.value = data.bio || '';
    shelterAddress.value = data.address || '';
    Phone.value = data.contact || '';
    email.value = data.email || '';
    lat.value = data.latitude || '';
    lng.value = data.longitude || '';
    url.value = data.profile || '';
    // Handle links based on their format

    console.log("lat lang to pass", lat.value, lng.value)

    if (data.link) {
        let parsedLinks = [];
        try {
            // Attempt to parse as JSON
            parsedLinks = JSON.parse(data.link);
            if (!Array.isArray(parsedLinks)) {
                throw new Error('Parsed links is not an array');
            }
        } catch (error) {
            console.warn('Links are not in JSON format. Attempting to split by comma.');
            // Fallback: split by comma
            parsedLinks = data.link.split(',').map(link => link.trim()).filter(link => link);
        }
        links.value = parsedLinks.map(link => ({ value: link }));
    } else {
        links.value = [{ value: '' }];
    }

    // Handle profile image if available
    if (data.profile) {
        try {
            const response = await axios.post("http://localhost:5000/image",
                {
                    profileUrl: data.profile
                })
            selectedImage.value = response.data.data
        }
        catch (err) {
            console.log(err)
        }
    }
}

async function saveProfile() {
    if (!fileToUpload) {
        fileToUpload = url.value;
    }

    const transformedLinks = links.value.map(linkObj => linkObj.value);
    const id = localStorage.getItem('c_id')

    const formData = new FormData();
    formData.append('image', fileToUpload);
    formData.append('shelterid', id);
    formData.append('links', JSON.stringify(transformedLinks)); // Serialize if backend expects JSON
    formData.append('sheltername', shelterName.value);
    formData.append('shelteraddress', shelterAddress.value);
    formData.append('contact', Phone.value);
    formData.append('email', email.value);
    formData.append('latitude', lat.value);
    formData.append('longitude', lng.value);
    formData.append('bio', about.value);

    // Log FormData entries for debugging
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
        const response = await axios.post("http://localhost:5000/save_shelterprofile",
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' } // Correct header placement
            }
        );

        if (response.data.success) {
            navigateTo({
                path: "/myshelter",
                query: { showToast: true, message: 'Saved Successfully', status: 'success'}
            });
        } else {
            if (route.query.showToast) {
                if (toastRef.value) {
                    toastRef.value.showToast('error', response.data.message);
                }
            }
        }
    }
    catch (err) {
        // Enhanced error handling
        if (err.response) {
            // Server responded with a status other than 2xx
            console.error("Backend error:", err.response.data);
            alert(`Error: ${err.response.data.message}`);
        } else if (err.request) {
            // Request was made but no response received
            console.error("No response from server:", err.request);
            alert('No response from server. Please try again later.');
        } else {
            // Something else caused the error
            console.error("Error:", err.message);
            alert(`Error: ${err.message}`);
        }
    }
}
onMounted(() => {
    get_Shelter_Details();
});
</script>


<template>
    <form>
        <div id="shelterform" class="space-y-12 sm:mx-[1rem] md:mx-[2rem] lg:mx-[10rem] my-[2.5rem]">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Shelter Profile</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be
                    careful what you share.</p>
                <div class="mt-10 border-t pt-[2rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="shelterName" class="block text-sm font-medium leading-6 text-gray-900">Shelter's
                            Name</label>
                        <div class="mt-2">
                            <input type="text" v-model="shelterName" name="shelterName" id="shelterName"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="profile-photo" class="block text-sm font-medium leading-6 text-gray-900">Profile
                            photo</label>
                        <div :class="{ 'py-5': !selectedImage, 'py-2': selectedImage }"
                            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                            <div class="text-center" v-if="!selectedImage">
                                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label for="file-upload"
                                        class="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" ref="fileInput" name="file-upload" type="file"
                                            class="sr-only" @change="handleFileChange" />
                                    </label>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            <div v-else class="flex justify-center items-center h-full w-full relative">
                                <img :src="selectedImage" class="max-w-[15rem] max-h-[15rem]" />
                                <button @click="clearImage"
                                    class="absolute top-2 sm:right-[1rem] lg:right-[8.1rem] text-gray-600 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-[1rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">About
                            Shelter</label>
                        <div class="mt-2">
                            <textarea v-model="about" id="about" name="about" rows="3"
                                placeholder="Describe what the shelter is about"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </textarea>
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label for="shelterAddress" class="block text-sm font-medium leading-6 text-gray-900">Shelter's
                            Location</label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <MapPinIcon alt="Logout Icon" class="w-6 h-6 text-gray-500" aria-hidden="true" />
                            <input type="text" v-model="shelterAddress" name="shelterAddress" id="shelterAddress"
                                autocomplete="street-address"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div @click.prevent="showMapModal = true">
                                <img width="30" height="30"
                                    src="https://img.icons8.com/fluency-systems-regular/50/map-editing.png"
                                    alt="map-editing" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="Phone" class="block text-sm font-medium leading-6 text-gray-900">Contact
                            Number</label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <PhoneIcon alt="Logout Icon" class="w-6 h-6 text-gray-500" aria-hidden="true" />
                            <input type="text" v-model="Phone" name="Phone" id="Phone" autocomplete="Phone"
                                placeholder="Contact Number"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address
                        </label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <EnvelopeIcon alt="Logout Icon" class="w-6 h-6 text-gray-500" aria-hidden="true" />
                            <input type="text" v-model="email" name="email" id="email" autocomplete="email"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-full">
                        <label for="link" class="block text-sm font-medium leading-6 text-gray-900">Website and Social
                            Link</label>
                        <!-- links loop -->
                        <div>
                            <div v-for="(link, index) in links" :key="index" class="mt-2 flex gap-x-3 items-center">
                                <LinkIcon alt="Link Icon" class="w-6 h-6 text-gray-500" aria-hidden="true" />
                                <input v-model="link.value" type="text" autocomplete="link" placeholder="Social Link"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <!-- Add an x button to remove the link -->
                                <button type="button" @click="removeLink(index)"
                                    class="ml-2 text-gray-500 hover:text-red-500 text-[1.3rem] font-normal">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <!-- function that adds more input tags and display or duplicate the social link input -->
                            <button type="button" @click="addLink"
                                class="mt-2 ml-[3rem] text-gray-500 text-[14px] font-medium">Add more links</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <router-link to="/myshelter" class="text-sm font-semibold leading-6 text-gray-900">Cancel</router-link>
                <!-- @click="showPrompt" //gitanggal nko ang prompt -->
                <button type="button" @click.prevent="saveProfile()"
                    class="rounded-md bgteal px-[2rem] py-2 text-sm font-semibold text-white shadow-sm hover:bg-bgteal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save Changes</button>
            </div>
            <prompt v-model:isOpen="isModalpromptOpen" @save-clicked="handleSaveClick" />
            <mapoverlay :shelterlatitude="lat" :shelterlongitude="lng" v-if="showMapModal"
                @close="showMapModal = false" />
            <Toast ref="toastRef" @closed="refreshRoute($router)" />
            <!-- @closed="refreshRoute($router); navigateAfterToast() -->
        </div>
    </form>
</template>
