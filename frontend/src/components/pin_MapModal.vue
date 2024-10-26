<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @close="handleClose">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-teal-500 bg-opacity-20 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[90vw] sm:p-6">
                            <!-- <div>search bar huie</div> search bar here pls tnx uwu -->
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button type="button"
                                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    @click="closeModal($event)">
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div class="text-sm font-semibold text-gray-700">
                                <span>Pin Shelter's Location</span>
                            </div>
                            <div class="mt-4 sm:flex sm:items-start justify-center">
                                <div class="border rounded-lg drop-shadow-sm">
                                    <displayMap :shelterlat="latlang.shelterlatitude" :shelterlng="latlang.shelterlongitude" containerHeight="75vh" containerWidth="87vw"
                                        @location-changed="handleLocationChange" />
                                    <!-- <displayMap   class="h-[75vh] w-[87vw]"/>  -->
                                    <!-- " -->
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
                                    @click="savePinnedAddress(); open = false; closeModal($event)">Confirm Location</button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="open = false">Setup Later</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import axios from "axios"
import { ref, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const latlang = defineProps({
    shelterlatitude: {
        type: Number,
        required: false
    },
    shelterlongitude: {
        type: Number,
        required: false
    }
})

import displayMap from '@/components/Map2.vue'


const address = ref([])
const lat = ref([])
const lng = ref([])
const shelterid = localStorage.getItem('c_id')

const open = ref(true);
const emit = defineEmits(['close']);
const router = useRouter(); // Initialize router at the top
const route = useRoute(); // Get the current route

const closeModal = (event) => {
    event.preventDefault(); // Prevent default behavior if needed
    open.value = false;  // Control the modal's visibility
    emit('close');       // Emit the 'close' event to the parent

    const targetRoute = route.name === 'shelterDashboard' ? 'shelterDashboard' : 'editshelterprofile';

    // Navigate after closing
    router.replace({ query: { open: false } });
    router.push({ name: targetRoute });
};

async function savePinnedAddress() {
    try {
        const response = await axios.post("http://localhost:5000/update-shelter-details", {
            address: address.value,
            latitude: lat.value,
            longitude: lng.value,
            id: shelterid
        })

        if (response.data.success) {
            console.log("change address exists")
            localStorage.setItem('address_exists', true)
        }
    }
    catch (err) {
        console.log("error happend", err)
    }
}


function handleLocationChange(location) {
    console.log(location)

    address.value = location.address;
    lat.value = location.lat;
    lng.value = location.lng;
    console.log('Location data received:', address.value, lat.value, lng.value);
}
</script>