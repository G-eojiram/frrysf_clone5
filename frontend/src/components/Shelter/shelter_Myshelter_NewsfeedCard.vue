<!-- <script setup>
import viewpostdetials from '@/components/Shelter/shelter_Myshelter_ViewpostDetailsModal.vue';
import { ref } from 'vue';

const showModalViewDetails = ref(false)

const toggleModalViewDetails = () => {
    showModalViewDetails.value = !showModalViewDetails.value;
};
// newsfeed
const shelterpost = ref([
    {
        caption: 'You can’t buy love, but you can rescue it.',
        who: 'Eric',
        imageUrl: require('@/assets/images/rescue.png'),
        dropdownOpen: false
    },
    {
        caption: 'Saving on dog will not change the world, but surely for that one dog, the world will change forever.” - Karen Davison',
        who: 'Jeneh',
        imageUrl: require('@/assets/images/animalshelterdog.png'),
        dropdownOpen: false
    },
    {
        caption: 'Do you believe in love at first sight, or should I wag my tail again?',
        who: 'Cyril',
        imageUrl: require('@/assets/images/homepage.png'),
        dropdownOpen: false
    },
]);
</script>

<template>
    <div>
        <div v-for="(post, index) in shelterpost" :key="index" class="border rounded-lg bg-white w-full h-fit mb-4">
            <div class="px-[2rem] py-[10px] border-b-2 grid grid-flow-col items-center justify-between">
                <span class="sr-only">header space</span>
            </div>
            <div class="w-full bg-slate-50">
                <img class="mx-auto flex-shrink-0 w-[50rem]" :src="post.imageUrl" alt="image post" />
            </div>
            <div class="px-[2rem] py-[2rem]">
                <div class="grid grid-flow-col justify-between">
                    <h1 class="flex items-center gap-4">
                        <img width="25" height="25" src="https://img.icons8.com/color/48/dog-paw-print.png"
                            alt="dog-paw-print" />
                        {{ post.who }}
                    </h1>
                    <div class="relative">
                        <button @click="post.dropdownOpen = !post.dropdownOpen" class="flex items-center">
                            <img width="12" height="12" src="https://img.icons8.com/ios-filled/50/4D4D4D/menu-2.png"
                                alt="menu-2" />
                        </button>
                        <div v-if="post.dropdownOpen"
                            class="absolute right-0 mt-2 w-[8rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button @click="toggleModalViewDetails"
                                    class="block w-full py-2 text-sm  text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem">View post</button>
                                <viewpostdetials v-if="showModalViewDetails" @close="toggleModalViewDetails" />
                                <button
                                    class="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem">Edit post</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-sm font-medium text-gray-900 pt-[1rem]">{{ post.caption }}</p>
            </div>
        </div>
    </div>
</template> -->
<script setup>
import { ref } from 'vue';
import { ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/vue/24/outline";
import { IdentificationIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'
import viewpostdetials from '@/components/Buddy/buddy_Home_ViewdetailsModal.vue';
import viewpostimagepreview from '@/components/Buddy/buddy_Home_ImagePreviewModal.vue';


import previewhover from '@/components/Buddy/buddy_HoverName.vue';
const hoveredIndex = ref(null); // Track the hovered item index

// view detials
const selectedPostViewDetailsId = ref(null);

const toggleModalViewDetails = (id) => {
    selectedPostViewDetailsId.value = selectedPostViewDetailsId.value === id ? null : id;
    console.log(id);
};

// view image preview
const selectedPostViewImagePreviewId = ref(null);

const toggleModalViewImagePreview = (id) => {
    selectedPostViewImagePreviewId.value = selectedPostViewImagePreviewId.value === id ? null : id;
    console.log(id);
};


// newsfeed
const shelterpost = ref([
    {
        id: 1,
        username: 'Eric',
        badge: "Shelter",
        profileImage: require('@/assets/images/eric.png'),
        caption: 'I choose to admire you in silence, because in silence I feel no rejection.',
        imageUrl: require('@/assets/images/eric.png'),
    },
    {
        id: 2,
        username: 'bals',
        badge: "Buddy",
        profileImage: require('@/assets/images/bals.png'),
        caption: 'wah ahahhahahah.',
        imageUrl: require('@/assets/images/bals.png'),
    },
    {
        id: 3,
        username: 'charles',
        badge: "Buddy",
        profileImage: require('@/assets/images/charles.png'),
        caption: 'luh ehehhehehe',
        imageUrl: require('@/assets/images/charles.png'),
    },
    {
        id: 4,
        username: 'robert',
        badge: "Buddy",
        profileImage: require('@/assets/images/bert.png'),
        caption: 'AHHHHHHHHH AHHHAHAHAHAH',
        imageUrl: require('@/assets/images/bert.png'),
    },
]);
</script>

<template>
    <div v-for="post in shelterpost" :key="post.id"
        class="sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] h-fit mb-4 mx-auto bg-white py-2 px-4  rounded-xl">
        <div class="px-[.5rem] py-[10px] flex gap-x-2 items-center">
            <div>
                <img :src="post.profileImage" alt="profile"
                    class="w-10 h-10 flex border bg-white rounded-full object-cover" />
            </div>

            <RouterLink to="" class="font-bold text-base"> <!-- path sa view user profile butang sa to="" -->
                <div @mouseenter="hoveredIndex = post.id" @mouseleave="hoveredIndex = null"
                    class="relative inline-block">
                    <span class="hover:underline cursor-pointer">{{ post.username }}</span>
                    <previewhover v-if="hoveredIndex === post.id" class="absolute z-10" />
                </div>
            </RouterLink>
            <span class="text-[11px] border py-1 px-3 font-medium rounded-full bg-gray-50">{{ post.badge }}</span>
            <!-- <span :class="{
                'text-[10px] border py-1 px-3 font-medium rounded-full': true,
                'bg-amber-200 border-amber-300': post.badge === 'Shelter',
                'bg-teal-200 border-teal-300': post.badge === 'Buddy',
                'bg-gray-50': post.badge !== 'Shelter' && post.badge !== 'Buddy',
            }">{{ post.badge }}</span> -->
        </div>

        <div class="w-full h-fit rounded-xl bg-black flex flex-col items-center relative group">
            <img @click="toggleModalViewImagePreview(post.id)"
                class="mx-auto flex-shrink-0 w-[50rem] rounded-xl object-contain cursor-pointer" :src="post.imageUrl"
                alt="image post" />

            <!-- Image Preview -->
            <viewpostimagepreview v-if="selectedPostViewImagePreviewId === post.id"
                @close="toggleModalViewImagePreview(post.id)" />
            <!-- view details button -->
            <div class="absolute bg-gray-900 bg-opacity-30 rounded-b-xl w-full bottom-0 hidden group-hover:block">

                <div class="flex justify-end p-2">
                    <button @click="toggleModalViewDetails(post.id)" class="relative right-0">
                        <InformationCircleIcon class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-100 hover:text-white" />
                    </button>
                    <viewpostdetials v-if="selectedPostViewDetailsId === post.id"
                        @close="toggleModalViewDetails(post.id)" />
                </div>
            </div>
        </div>

        <div class="p-2 px-3">
            <div class="flex items-center gap-x-4">
                <RouterLink to="" title="Chat with Us" class="flex items-center gap-x-2 relative group">
                    <ChatBubbleLeftRightIcon class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-900" />
                    <span class="font-bold text-sm hidden group-hover:flex">
                        Message Us
                    </span>
                </RouterLink>

                <RouterLink to="" title="Pet Profile" class="flex items-center gap-x-2 relative group">
                    <UserCircleIcon class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-900" />
                    <span class="font-bold text-sm hidden group-hover:flex">
                        View Pet Profile
                    </span>
                </RouterLink>
            </div>
        </div>

        <div class="px-[.5rem] py-[.5rem] flex flex-col gap-y-2 items-start bg-gray-100 bg-opacity-0 border-t">
            <div class="py-2">
                <p class="sm:text-sm md:text-base font-medium text-gray-700">
                    <b class="pr-2">{{ post.username }}</b>
                    {{ post.caption }}
                </p>
            </div>
        </div>
    </div>
</template>
