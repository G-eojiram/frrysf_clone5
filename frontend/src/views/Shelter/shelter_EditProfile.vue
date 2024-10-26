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
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                        </div>
                    </div>
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="Phone" class="block text-sm font-medium leading-6 text-gray-900">Contact
                            Number</label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <PhoneIcon alt="Logout Icon" class="w-6 h-6 text-gray-500" aria-hidden="true" />
                            <input type="text" v-model="Phone" name="Phone" id="Phone" autocomplete="Phone"
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
                                <input v-model="link.value" type="text" autocomplete="link"
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
                            <!-- temp displays container -->
                            <div class="mt-[1rem] bg-white rounded-lg border border-dashed p-[1rem] text-[13px]">
                                <h2>Collected links:</h2>
                                <!-- function to display while typing the links -->
                                <ul class="pl-[1rem]">
                                    <li v-for="(link, index) in links" :key="index">{{ link.value }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <router-link to="/myshelter" class="text-sm font-semibold leading-6 text-gray-900">Cancel</router-link>
                <button type="submit"
                    class="rounded-md bgteal px-[2rem] py-2 text-sm font-semibold text-white shadow-sm hover:bg-bgteal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                    Changes</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { PhotoIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, LinkIcon } from '@heroicons/vue/24/solid'

const fileInput = ref(null); // Initialized with a value of null, but it will eventually hold a reference to the file input element.
const selectedImage = ref(null); // Initialized with a value of null, but it will eventually hold the selected image data (e.g., a URL string or a blob)
const links = ref([{ value: '' }]);

function handleFileChange(event) {
    const file = event.target.files[0]; // gets the first file selected by the user 
    const reader = new FileReader(); // creates a new FileReader object, which is used to read the contents of the file
    reader.onload = (event) => { // sets up an event listener for when the file reading is complete.
        // When the file reading is complete, the onload event is triggered, and the callback function is executed:
        selectedImage.value = event.target.result; // sets the selectedImage reference to the result of the file reading (the data URL string)
    };
    reader.readAsDataURL(file); // starts reading the file as a data URL (a string representation of the file contents)
}

function clearImage() {
    selectedImage.value = null; // sets the selectedImage reference to null, effectively removing the image
    if (fileInput.value) { // if the file input element exists, sets its value to an empty string, effectively clearing the file selection
        fileInput.value.value = '';
    }
}

// temp display links
function addLink() {
    console.log('Add link button clicked');
    links.value.push({ value: '' }); //the one that adds a new input tag to the template.
    console.log('Links array:', links.value);
}

// This function takes the index of the link to be removed as an argument, and uses the splice method to remove that element from the links array.
// the splice method will remove the element at index for example, if we have an array links = [{ value: 'link1' }, { value: 'link2' }, { value: 'link3' }] and we call removeLink(1), the splice method will remove the element at index 1 ({ value: 'link2' }) and the resulting array will be links = [{ value: 'link1' }, { value: 'link3' }].
function removeLink(index) {
    links.value.splice(index, 1);
}
</script>