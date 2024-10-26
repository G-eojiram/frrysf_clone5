<template>
    <div>
        <div>
            <img class="h-32 w-full object-cover lg:h-48" :src="profile.coverImage" alt="" />
        </div>
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:space-x-5">
                <div class="flex justify-center sm:flex-1 md:flex-none">
                    <img class="xl:h-40 xl:w-40 rounded-full ring-4 object-cover ring-white sm:h-32 sm:w-32"
                        :src="profile.profileImage" alt="" />
                </div>
                <div class="sm:min-w-0 sm:hidden md:flex sm:flex-1 sm:items-end sm:justify-end sm:space-x-6 sm:pb-1">
                    <div class="min-w-0 flex-1 md:flex gap-x-3 items-center text-gray-700">
                        <h1 class="truncate text-2xl font-bold">
                            {{ profile.name }} {{ profile.lastname }}</h1>
                        <span class="bg-gray-50 px-4 border rounded-2xl text-sm font-medium">{{ profile.badge }}</span>
                    </div>
                    <div class="flex flex-col justify-stretch md:flex space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <button type="button"
                            class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <EnvelopeIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Message</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6 hidden min-w-0 flex-1 sm:flex md:hidden justify-center items-center gap-x-2 text-gray-700">
                <h1 class="truncate text-2xl font-bold">{{ profile.name }} {{ profile.lastname }}</h1>
                <span class="bg-gray-50 px-4 border rounded-2xl text-sm font-medium">{{ profile.badge }}</span>
            </div>
            <div class="hidden sm:flex md:hidden justify-center mt-3">
                <button type="button"
                    class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <EnvelopeIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Message</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'

const profile = {
    name: 'Eric',
    lastname: 'Ramones',
    badge: 'Buddy',
    email: 'ricardo.cooper@example.com',
    profileImage:
        require('@/assets/images/eric.png'),
    coverImage:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
}
</script>