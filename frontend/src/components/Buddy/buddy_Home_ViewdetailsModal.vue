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
                        <DialogPanel
                            class="relative transform overflow-hidden p-10 lg:px-10 xl:px-20 transition-all sm:my-8 sm:w-full sm:max-w-fit">
                            <div
                                class="absolute z-10 sm:right-1 sm:top-1 md:right-3.5 md:top-3 rounded-full flex items-center p-1 group">
                                <button @click="$emit('close')" ref="cancelButtonRef">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2"
                                        class="sm:w-5 sm:h-5 md:w-7 md:h-7 text-gray-200 hover:text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                class="overflow-hidden bg-white shadow sm:rounded-lg text-start sm:px-[1rem]  xl:px-[5rem] sm:w-fit xl:w-[70rem]">
                                <div class="px-4 py-6 sm:px-6">
                                    <h3 class="text-base font-semibold leading-7 text-gray-900">Owner's Name
                                    </h3>
                                    <p class=" max-w-2xl text-sm leading-6 text-gray-500">
                                        {{ viewpostdetials.sheltername }}</p>
                                </div>
                                <div class="border rounded-xl border-gray-100 sm:mx-4 mb-8">
                                    <dl class="divide-y divide-gray-100">
                                        <div
                                            class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-t-xl bg-gray-100">
                                            <span class="text-base font-semibold leading-6 text-gray-900 sm:col-span-3">
                                                Pet Information</span>
                                        </div>
                                        <div class="px-4 py-4 sm:grid md:grid-cols-3 sm:gap-y-2 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Date Re-homed</dt>
                                            <dd class=" text-sm leading-6 text-gray-700">
                                                {{ viewpostdetials.rehomed }}"</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Given-Name</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2">
                                                {{ viewpostdetials.name }}, "{{ viewpostdetials.nickname }}"</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Pet Type</dt>
                                            <dd class="text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.type }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Breed / Mix</dt>
                                            <dd class="text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.breed }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Age / Gender</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.age }}, {{ viewpostdetials.gender }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Size</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.size }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Coat / Fur</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.coat }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Energy Level</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.energylvl }}</dd>
                                        </div>

                                        <div class="px-4 py-4 sm:grid md:grid-cols-3 sm:gap-y-2 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">About</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.about }}</dd>
                                        </div>
                                        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-100">
                                            <span class="text-base font-semibold leading-6 text-gray-900 sm:col-span-3">
                                                Health And Medical</span>
                                        </div>
                                        <div class="px-4 py-4 sm:grid md:grid-cols-3 sm:gap-y-2 sm:px-6"
                                            v-for="(item, index) in healthAndMedical" :key="index">
                                            <dt class="text-sm font-medium leading-6 text-gray-900 mr-[2rem]">{{
                                                item.label }}</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ item.status }} {{ item.details ? `(${item.details})` : '' }}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>





                            <!-- context start -->
                            <!-- <div class="bg-white w-[80rem] h-fit text-start">
                                <div class="px-4 py-4 sm:px-6">
                                    <h3 class="text-base font-semibold leading-7 text-gray-900">Owner's Name</h3>
                                    <p class="mt-.5 max-w-2xl text-sm leading-6 text-gray-500">{{
                                        viewpostdetials.sheltername }}</p>
                                </div>
                                <dl class="divide-y divide-gray-100">
                                    <div class="px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-900">Pet Name</dt>
                                        <dd class=" text-sm leading-6 text-gray-700 sm:col-span-1 ">
                                            {{ viewpostdetials.name }}</dd>
                                    </div>
                                </dl>
                            </div> -->

                            <!-- <div class="overflow-hidden bg-white shadow sm:rounded-lg text-left xl:px-[5rem] w-[80rem]">
                                <div class="px-4 py-4 sm:px-6">
                                    <h3 class="text-base font-semibold leading-7 text-gray-900">Owner's Name</h3>
                                    <p class="mt-.5 max-w-2xl text-sm leading-6 text-gray-500">{{
                                        viewpostdetials.sheltername }}</p>
                                </div>
                                <div class="border-t border-gray-100">
                                    <dl class="divide-y divide-gray-100">
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Pet Name</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.name }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Date-Rehomed</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.rehomed }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Pet Type</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.type }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Breed / Mix</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.breed }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">Size</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.size }}</dd>
                                        </div>
                                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-900">About</dt>
                                            <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                {{ viewpostdetials.about }}</dd>
                                        </div>
                                       
                                        <div class="border-t border-gray-100 px-4 py-4 sm:col-span-2 sm:px-0">
                                            <span class="text-sm font-semibold leading-6 text-gray-900">Health and
                                                Medical</span>
                                            <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                                v-for="(item, index) in healthAndMedical" :key="index">
                                                <dt class="text-sm font-normal  leading-6 text-gray-900 mr-[2rem]">{{
                                                    item.label }}</dt>
                                                <dd class=" text-sm leading-6 text-gray-700 sm:col-span-2 ">
                                                    {{ item.status }} {{ item.details ? `(${item.details})` : '' }}</dd>
                                            </div>
                                        </div>
                                    </dl>
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
import { ref, reactive, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

// Reactive state
const currentIndex = ref(0);

const viewpostdetials = {
    id: 1,
    sheltername: 'Shelter Ni Eric',
    profile: require("@/assets/images/eric.png"),
    name: "Eric",
    nickname: "ric",
    rehomed: "10/22/2024",
    type: "Dog",
    breed: "Bulldog",
    gender: "Male",
    age: '2 yrs old',
    size: "50 pounds",
    coat: "Medium Fur",
    energylvl: "high",
    about: "jdsjdsjdsjd;l yehhhh dshd hdsahdo  idsoidh disj hsoi ihhs ihuh hsa gu hgp  ihdhasoh  ihuidgsa  ugui gdsugd ugug dus usgduia",
    vacstatus: "rabies",
    surgerystatus: "Chemical Sterilazation",
    medcondition: "none",
    needs: "Lambing ni Rhe...",

};

const healthAndMedical = reactive([
    {
        label: 'Vaccinations Status',
        status: "Up-to-date",
        details: "including rabies and FVRCP"
    },
    {
        label: 'Spay / Neuter',
        status: "Neuter"
    },
    {
        label: 'Medical Conditions',
        status: "None known",
        details: "but has a slight dental issue that requires regular cleaning"
    },
    {
        label: 'Special Needs',
        status: "None"
    }
]);

const emit = defineEmits(['close']) // for closing the modal

const open = ref(true)
</script>