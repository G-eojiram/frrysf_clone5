<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'; // Import useRoute
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, BellIcon, PlusIcon, AdjustmentsHorizontalIcon, ArrowRightStartOnRectangleIcon, UserIcon, CursorArrowRaysIcon, HomeIcon, ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import axios from "axios"
import CreateReportModal from '@/components/Buddy/buddy_CreateReportPost_Modal.vue'
const openCreateModal = ref(false) // for create report modal

const navigation = [
    { name: 'Home', to: { name: 'buddy_home' }, icon: HomeIcon, current: false },
    { name: 'Message', to: { name: 'buddy_messages' }, icon: ChatBubbleOvalLeftEllipsisIcon, current: false },
    { name: 'Explore', to: { name: '' }, icon: CursorArrowRaysIcon, current: false },
    { name: 'Create', to: null, icon: PlusIcon, current: false, },
    { name: 'Profile', to: { name: '' }, icon: UserIcon, current: false },
]

const route = useRoute()
const router = useRouter();
//logout 
function navigateTo(path) {
    router.push(path);
}
// Computed property to determine the current navigation item
const currentNavigatedItem = computed(() => {
    return navigation.find(item => item.to && item.to.name === route.name);
});


const userNavigation = [
    { name: 'Your profile', to: { name: 'profile' }, },
]

const avatar = {
    username: 'Eric',
    profileImage: require('@/assets/images/eric.png'),
    icon: ChevronDownIcon
}
async function logout() {
    try {
        //req to clear cookies 
        const response = await axios.post("http://localhost:5000/logout")

        console.log(response)
        // return
        if (response.status == '200') {
            // console.log("Successfully logged out."); 
            localStorage.removeItem('u_id')
            localStorage.removeItem('u_type')
            localStorage.removeItem('c_id')
            localStorage.removeItem('access_token')
            navigateTo('/')

        } else {
            console.log("Failed to log out.");
        }
    }
    catch (err) {
        alert("An error occured when logging out")
        console.log(err)
    }
}

const sidebarOpen = ref(false)
</script>

<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component for mobile -->
                            <div
                                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10">
                                <div class="flex h-16 shrink-0 items-center">
                                    <span class="font-bold text-xl text-gray-800 px-4">FurrySafe</span>
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <span
                                                    class="text-[11px] font-semibold text-gray-600 px-4">NAVIGATION</span>
                                                <li v-for="item in navigation" :key="item.name">
                                                    <RouterLink v-if="item.name !== 'Create'" :to="item.to"
                                                        :class="[item === currentNavigatedItem ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100', 'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold px-6 cursor-pointer']">
                                                        <component :is="item.icon" class="h-6 w-6 shrink-0"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </RouterLink>
                                                    <button v-else @click="openCreateModal = true"
                                                        :class="[item === currentNavigatedItem ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100', 'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold px-6 cursor-pointer']">
                                                        <component :is="item.icon" class="h-6 w-6 shrink-0"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </button>
                                                </li>

                                            </ul>
                                        </li>

                                        <li class="mt-auto">
                                            <!-- si to="" diri ibutang ang path example to="/profile" -->
                                            <RouterLink to=""
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-600 hover:bg-gray-100 hover:text-gray-800 px-6">
                                                <AdjustmentsHorizontalIcon class="h-6 w-6 shrink-0"
                                                    aria-hidden="true" />
                                                Settings
                                            </RouterLink>
                                            <a @click.prevent="logout()"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-600 hover:bg-gray-100 hover:text-gray-800 px-6">
                                                <ArrowRightStartOnRectangleIcon class="h-6 w-6 shrink-0"
                                                    aria-hidden="true" />
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r py-4 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                    <span class="font-bold text-xl text-gray-900 px-4">FurrySafe</span>
                </div>
                <nav class="flex flex-1 flex-col mt-10">
                    <ul role="list" class="flex flex-1 flex-col">
                        <li>
                            <ul role="list" class="-mx-2 space-y-4">
                                <span class="text-[11px] font-semibold text-gray-600 px-4">NAVIGATION</span>
                                <!-- <li v-for="item in navigation" :key="item.name">
                                    <RouterLink v-if="item.name !== 'Create'" :to="item.to"
                                        :class="[item.current ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100', 'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold px-6 cursor-pointer']">
                                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </RouterLink>
                                    <button v-else @click="openCreateModal = true"
                                        :class="[item.current ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100', 'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold px-6 cursor-pointer']">
                                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </button>
                                </li> -->
                                <li v-for="item in navigation" :key="item.name">
                                    <RouterLink v-if="item.name !== 'Create'" :to="item.to"
                                        :class="[item === currentNavigatedItem ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100', 'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold px-6 cursor-pointer']">
                                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </RouterLink>
                                    <button v-else @click="openCreateModal = true"
                                        :class="[item === currentNavigatedItem ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100', 'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold px-6 cursor-pointer']">
                                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </button>
                                </li>

                            </ul>
                        </li>

                        <li class="mt-auto">
                            <RouterLink to=""
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-600 hover:bg-gray-100 hover:text-gray-800 px-6">
                                <AdjustmentsHorizontalIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                                Settings
                            </RouterLink>
                            <a @click.prevent="logout()"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-600 hover:bg-gray-100 hover:text-gray-800 px-6">
                                <ArrowRightStartOnRectangleIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Separator display pag ang screen kay gamay-->
                <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
                <!-- Search Engine -->
                <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <form class="relative flex flex-1" action="#" method="GET">
                        <label for="search-field" class="sr-only">Search</label>
                        <MagnifyingGlassIcon
                            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                            aria-hidden="true" />
                        <input id="search-field"
                            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm"
                            placeholder="Search..." type="search" name="search" />
                    </form>
                    <div class="flex items-center gap-x-4 lg:gap-x-6">
                        <!-- notif idk if unsa pay ipang butang -->
                        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <!-- Separator -->
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative">
                            <MenuButton class="-m-1.5 flex items-center p-1.5">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full bg-gray-50" :src="avatar.profileImage"
                                    alt="profile-avatar" />
                                <span class="hidden lg:flex lg:items-center">
                                    <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                        {{ avatar.username }}
                                    </span>
                                    <component :is="avatar.icon" class="ml-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                </span>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }"
                                        as="div">
                                    <!-- padung sa profile sa user use routerlink para dli mo reload if mag navigate -->
                                    <RouterLink :to="item.to"
                                        :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-800']">
                                        {{
                                            item.name }}</RouterLink>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <main class="py-10 bg-gray-50">
                <div class="px-4 sm:px-6 lg:px-8">
                    <RouterView /> <!-- diri mang display ang mga child sa dashboard -->
                    <CreateReportModal v-if="openCreateModal" @close="openCreateModal = false" />
                </div>
            </main>
        </div>
    </div>
</template>
