<template>
    <header>
        <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex px-2 lg:px-0">
                        <div class="flex flex-shrink-0 items-center">
                            <img :src="logo" alt="Logout Icon" class="w-10" aria-hidden="true" />
                            <h1 id="logotext" class="pl-3 font-extrabold text-2xl text-gray-600 lg:hidden">
                                FurrySafe</h1>
                        </div>
                        <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
                            <RouterLink v-for="(item, index) in navigation" :key="index" :to="item.to"
                                class="inline-flex items-center border-b-2"
                                :class="item.current ? 'border-teal-500 px-1 pt-1 text-sm font-bold text-gray-800 hover:text-lightorange' : 'border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-teal hover:text-lightorange'">
                                {{ item.name }}
                            </RouterLink>
                        </div>
                    </div>

                    <div class="flex items-center lg:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-50  hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-400">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div class="hidden lg:ml-4 lg:flex lg:items-center gap-4">
                        <RouterLink to="login" class="hover:text-lightorange">
                            Login</RouterLink>
                        <RouterLink to="buddy-registration"
                            class="bgteal text-white p-1.5 px-4 rounded-lg font-medium hover:bg-lightorange">
                            Sign-Up</RouterLink>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="lg:hidden">
                <div class="space-y-1 pb-3 pt-2">
                    <DisclosureButton v-for="item in navigation" :key="item.name" @click="$router.push(item.to)"
                        :class="[item.current ? 'block  bg-teal-50 py-2 pl-3 pr-4 text-base font-medium text-teal-500 hover:text-gray-700' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700', 'block border-transparent py-2 pl-3 pr-4 w-full text-base font-medium hover:bg-amber-100']"
                        :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                    </DisclosureButton>
                </div>
                <div class="border-t border-gray-200 pb-3 pt-4 space-y-2 text-white">
                    <div class="mx-[1rem]">
                        <RouterLink to="buddy-registration"
                            class="w-full bgteal rounded-lg py-2 flex justify-center hover:bg-bgteal hover:font-medium">
                            Sign-Up
                        </RouterLink>
                    </div>
                    <div class="mx-[1rem]">
                        <RouterLink to="login"
                            class="w-full bgorange rounded-lg py-2 flex justify-center hover:bg-lightorange hover:font-medium">
                            Login</RouterLink>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </header>
    <main>
        <div>
            <RouterView /> <!-- main content page -->
        </div>
    </main>
    <footer class="mt-auto">
        <div>
            <linkfooter />
        </div>
    </footer>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import logo from '@/assets/images/frrysfLOGO.png' // FurrySafe Logo

import Linkfooter from '../components/footerLink.vue'
const navigation = [
    { name: 'Home', to: { name: 'landingpage' }, current: true },
    { name: 'Featured', to: { name: 'buddyDashboard' }, current: false },
    { name: 'Contacts', to: { name: '' }, current: false },
    { name: 'About', to: { name: '' }, current: false },
    { name: 'FAQ', to: { name: '' }, current: false },
]
</script>