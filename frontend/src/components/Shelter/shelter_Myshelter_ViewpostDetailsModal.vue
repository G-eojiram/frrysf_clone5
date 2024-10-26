<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @click.self="$emit('close')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden p-10 lg:px-10 xl:px-20 transition-all sm:my-8 sm:w-full sm:max-w-fit">
                            <div
                                class="absolute z-10 sm:right-1 sm:top-1 md:right-3.5 md:top-3 rounded-full flex items-center p-1 group">
                                <button @click="$emit('close')" ref="cancelButtonRef">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2"
                                        class="w-4 h-4 text-gray-900 sm:hover:text-white lg:hover:text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!-- context start -->
                            <div class="flex flex-col bg-white rounded-2xl">
                                <div
                                    class="sm:h-fit md:h-[30rem] lg:h-[40rem] xl:h-[45rem] flex sm:flex-col md:flex-row">
                                    <div
                                        class="flex items-center text-gray-700 md:hidden gap-x-2 border-b px-[2rem] py-4">
                                        <img :src="viewpostdetials.profile" alt="profile" class="w-10 h-10 rounded-full" />
                                        <span class="font-bold sm:text-base xl:text-xl">{{
                                            viewpostdetials.sheltername }}</span>
                                    </div>
                                    <div
                                        class="relative bg-gray-900 md:rounded-l-2xl flex justify-center items-center sm:w-full md:w-[60%] xl:w-[60%]">
                                        <div
                                            class="absolute left-4 z-10 bg-white bg-opacity-40 rounded-full flex items-center hover:bg-gray-100 hover:bg-opacity-50">
                                            <button v-if="hasPrev" @click="prevImage">
                                                <ChevronLeftIcon
                                                    class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700 sm:hover:text-white" />
                                            </button>
                                        </div>
                                        <div class="flex sm:h-fit md:h-[40rem] w-full">
                                            <img :src="currentImageUrl" alt="Image post"
                                                class="flex-shrink-0 object-contain" />
                                        </div>
                                        <div
                                            class="absolute right-4 z-10 bg-white bg-opacity-40 rounded-full flex items-center hover:bg-gray-100 hover:bg-opacity-50">
                                            <button v-if="hasNext" @click="nextImage">
                                                <ChevronRightIcon
                                                    class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700 sm:hover:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        class="text-gray-700 sm:w-full md:w-[40%] xl:w-[40%] sm:py-[1rem] rounded-r-2xl flex flex-col text-sm sm:border-t lg:border-l ">
                                        <!-- display details -->
                                        <div
                                            class="flex items-center sm:hidden md:flex gap-x-2 border-b px-[2rem] pb-4">
                                            <img :src="viewpostdetials.profile" alt="profile"
                                                class="w-10 h-10 rounded-full" />
                                            <span class="font-bold sm:text-base xl:text-xl">{{
                                                viewpostdetials.sheltername }}</span>
                                        </div>
                                        <div
                                            class="px-[2rem] py-[1rem] xl:my-[4rem] flex flex-col gap-y-2 sm:text-sm lg:text-base font-medium">
                                            <div class="flex gap-x-2">
                                                <span>Name:</span>
                                                <span>{{ viewpostdetials.name }}</span>
                                            </div>
                                            <div class="flex gap-x-2">
                                                <span>Breed:</span>
                                                <span>{{ viewpostdetials.breed }}</span>
                                            </div>
                                            <div class="flex gap-x-2">
                                                <span>Gender:</span>
                                                <span>{{ viewpostdetials.gender }}</span>
                                            </div>
                                            <div class="flex gap-x-2">
                                                <span>Age:</span>
                                                <span>{{ viewpostdetials.age }}</span>
                                            </div>
                                            <div class="flex gap-x-2">
                                                <span>Size:</span>
                                                <span>{{ viewpostdetials.size }}</span>
                                            </div>

                                            <div>
                                                <p class="text-base text-left font-medium text-gray-900 pt-[1rem]">
                                                    {{ viewpostdetials.caption }}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- content end -->

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

// Reactive state
const currentIndex = ref(0);

const viewpostdetials = {
    id: 1,
    sheltername: 'Name ni shelter',
    profile: require("@/assets/images/eric.png"),
    name: "Eric",
    breed: "Bulldog",
    gender: "Male",
    age: '2 yrs old',
    size: "50 pounds",
    caption: "Found this dog at abandoned lot near STI College Davao",
    imageUrls: [
        require("@/assets/images/homepage.png"),
        require("@/assets/images/charles.png"),
        require("@/assets/images/eric.png"),
        require("@/assets/images/bals.png"),
    ],
};

// Computed properties
const currentImageUrl = computed(() => viewpostdetials.imageUrls[currentIndex.value]);
const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < viewpostdetials.imageUrls.length - 1);

// Methods
const nextImage = () => {
    if (hasNext.value) {
        currentIndex.value++;
    }
};

const prevImage = () => {
    if (hasPrev.value) {
        currentIndex.value--;
    }
};

const emit = defineEmits(['close']) // for closing the modal

const open = ref(true)
</script>