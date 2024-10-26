<!-- <script>
// import { EyeIcon } from "@heroicons/vue/20/solid";
import statusbuttons from '@/components/Shelter/shelter_RescueOp_ReportCard_ReportStatusButtons.vue'
import { RouterLink } from 'vue-router';

import previewhover from '@/components/Shelter/shelter_HoverName.vue'

export default {
    components: {
        statusbuttons, previewhover
    },
    data() {
        return {
            showRescueCancelButtons: false,
            showSuccessMessage: false,
            hoveredIndex: null, // Track the hovered item index
            reports: [
                {
                    id: 1,
                    username: 'Eric Jr.',
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/eric.png'),
                    badge: 'rescuer',
                },
                {
                    id: 2,
                    username: 'Bals',
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bals.png'),
                    badge: 'rescuer',
                },
                {
                    id: 3,
                    username: 'Charles',
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/charles.png'),
                    badge: 'rescuer',
                },
                {
                    id: 4,
                    username: 'Bert',
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bert.png'),
                    badge: 'rescuer',
                },
            ]
        }
    }
};
</script> -->
<script setup>
import { ref } from 'vue';
import statusbuttons from '@/components/Shelter/shelter_RescueOp_ReportCard_ReportStatusButtons.vue';
import previewhover from '@/components/Shelter/shelter_HoverName.vue';

const showRescueCancelButtons = ref(false);
const showSuccessMessage = ref(false);
const hoveredIndex = ref(null); // Track the hovered item index

const reports = ref([
    {
        id: 1,
        username: 'Eric Jr.',
        type: 'Missing Dog',
        caption: 'Found this dog at abandoned lot near STI College Davao',
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        animalstatus: 'Severe',
        imageUrl: require('@/assets/images/eric.png'),
        badge: 'rescuer',
    },
    {
        id: 2,
        username: 'Bals',
        type: 'Missing Dog',
        caption: 'Found this dog at abandoned lot near STI College Davao',
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        animalstatus: 'Severe',
        imageUrl: require('@/assets/images/bals.png'),
        badge: 'rescuer',
    },
    {
        id: 3,
        username: 'Charles',
        type: 'Missing Dog',
        caption: 'Found this dog at abandoned lot near STI College Davao',
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        animalstatus: 'Severe',
        imageUrl: require('@/assets/images/charles.png'),
        badge: 'rescuer',
    },
    {
        id: 4,
        username: 'Bert',
        type: 'Missing Dog',
        caption: 'Found this dog at abandoned lot near STI College Davao',
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        animalstatus: 'Severe',
        imageUrl: require('@/assets/images/bert.png'),
        badge: 'rescuer',
    },
]);
</script>

<template>
    <div>
        <div v-for="(report, index) in reports" :key="index" class="bg-white shadow-md rounded-lg mb-4">
            <div class="h-[2rem] bg-white border-b-2 rounded-t-lg" />
            <div class="w-full bg-gray-50 border-b-2 relative group">
                <img class="mx-auto flex-shrink-0 w-[20rem] group-hover:filter group-hover:blur-sm"
                    :src="report.imageUrl" alt="image post" />
                <RouterLink to="/viewreportdetails"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                    <span class="font-semibold text-sm text-white">View Details </span>
                </RouterLink>
            </div>
            <div class="my-[1rem] px-[2rem] py-3 text-gray-700 grid gap-y-1">
                <span class="flex gap-5 text-sm">Report Type:
                    <h1 class="font-bold text-sm flex gap-3">{{ report.type }}</h1>
                </span>
                <span class="flex text-sm gap-3">Animal Status:
                    <span class="font-semibold text-[15px]">{{ report.animalstatus }}</span>
                </span>
                <span class="flex gap-10 text-sm">Location:
                    <p class="font-semibold text-sm">{{ report.location }}</p>
                </span>
                <span class="flex gap-5 text-sm items-center">
                    Reported by:
                    <RouterLink to="" class="font-bold text-base">
                        <div @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null" class="relative inline-block">
                            <span class="hover:underline cursor-pointer">{{ report.username }}</span>
                            <previewhover v-if="hoveredIndex === index" class="absolute z-10" />
                        </div>
                        <span class="text-[12px] font-medium border rounded-xl ml-3 px-2">badge</span>
                    </RouterLink>
                </span>
            </div>
            <div>
                <statusbuttons />
            </div>
        </div>
    </div>
</template>