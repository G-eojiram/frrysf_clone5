<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @click.self="$emit('close')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="flex bg-white bg-opacity-0 lg:px-10 xl:px-20 sm:my-8 sm:w-full">
                            <div class="absolute rounded-full items-center p-1 flex sm:right-1 md:right-3">
                                <button @click="$emit('close')" ref="cancelButtonRef">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2"
                                        class="sm:w-5 sm:h-5 md:w-7 md:h-7 text-gray-200 hover:text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div class="mt-[3rem] sm:mx-[2rem] w-full">
                                <div class="flex justify-center">
                                    <div class="relative md:rounded-l-2xl flex justify-center items-center">
                                        <div
                                            class="absolute sm:-left-7 lg:-left-11 z-10 bg-white bg-opacity-40 w-fit rounded-full flex items-center hover:bg-gray-100 hover:bg-opacity-50">
                                            <button v-if="hasPrev" @click="prevImage">
                                                <ChevronLeftIcon
                                                    class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700 sm:hover:text-white" />
                                            </button>
                                        </div>
                                        <div class="flex sm:h-fit xl:h-[50rem] w-full">
                                            <img :src="currentImageUrl" alt="Image post"
                                                class="flex-shrink-0 object-contain" />
                                        </div>
                                        <div
                                            class="absolute sm:-right-7 lg:-right-11 z-10 bg-white bg-opacity-40 w-fit rounded-full flex items-center hover:bg-gray-100 hover:bg-opacity-50">
                                            <button v-if="hasNext" @click="nextImage">
                                                <ChevronRightIcon
                                                    class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700 sm:hover:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- context start -->
                            <!-- <div class="flex">
                                <div
                                    class="sm:h-fit md:h-[30rem] lg:h-[40rem] xl:h-[45rem] flex sm:flex-col md:flex-row">
                           
                                    <div
                                        class="relative md:rounded-l-2xl flex justify-center items-center w-full">
                                        <div
                                            class="absolute sm:-left-8 lg:-right-8 z-10 bg-white bg-opacity-40 rounded-full flex items-center hover:bg-gray-100 hover:bg-opacity-50">
                                            <button v-if="hasPrev" @click="prevImage">
                                                <ChevronLeftIcon
                                                    class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700 sm:hover:text-white" />
                                            </button>
                                        </div>
                                        <div class="flex sm:h-fit md:h-[70rem] lg:h-[50rem] w-full">
                                            <img :src="currentImageUrl" alt="Image post"
                                                class="flex-shrink-0 object-contain" />
                                        </div>
                                        <div
                                            class="absolute sm:-right-8 lg:-right-9 z-10 bg-white bg-opacity-40 rounded-full flex items-center hover:bg-gray-100 hover:bg-opacity-50">
                                            <button v-if="hasNext" @click="nextImage">
                                                <ChevronRightIcon
                                                    class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700 sm:hover:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
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