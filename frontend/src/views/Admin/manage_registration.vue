<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Pending Request</h1>
            </div>
        </div>
        <div class="-mx-4 mt-10 sm:mx-0">
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Shelter's Name</th>
                        <th scope="col"
                            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                            Email Address</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Request Status</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only text-sm">Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request, requestIdx) in requests" :key="request.id">
                        <td
                            :class="[requestIdx === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 pr-3 text-sm sm:pl-6']">
                            <div class="font-medium text-gray-900">
                                {{ request.sheltername }}
                            </div>
                            <div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                <span>{{ request.email }}</span>
                            </div>
                            <div v-if="requestIdx !== 0" class="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                        </td>
                        <td
                            :class="[requestIdx === 0 ? '' : 'border-t border-gray-200', 'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell']">
                            {{ request.email }}</td>
                        <td
                            :class="[requestIdx === 0 ? '' : 'border-t border-gray-200', 'px-3 py-3.5 text-sm text-gray-500']">
                            <div class="hidden sm:block"><span
                                    class="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                                    {{ request.status }}</span></div>
                        </td>
                        <td
                            :class="[requestIdx === 0 ? '' : 'border-t border-transparent', 'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6']">
                            <Menu as="div" class="relative flex-none">
                                <MenuButton class="ml-auto -m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                    <span class="sr-only">Open options</span>
                                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                </MenuButton>
                                <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md py-2 bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <MenuItem v-slot="{ active }">
                                        <RouterLink 
                                            :to="{ name: 'request_preview', params: { id: request.id } }"
                                            :class="[active ? 'bg-gray-50' : '', 'block px-6 py-1 text-sm leading-6 text-teal-500']"
                                            class="text-center">
                                            View
                                        </RouterLink>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button
                                            @click.prevent = "responseRequest(request.id, 'Approved', 'TRUE'); refreshRoute($router)"
                                            :class="[active ? 'bg-gray-50' : '', 'block px-6 py-1 text-sm leading-6 text-green-400 w-full']">
                                            Approve
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button
                                            @click.prevent = "responseRequest(request.id, 'Rejected', 'FALSE'); refreshRoute($router)"
                                            :class="[active ? 'bg-gray-50' : '', 'block px-6 py-1 text-sm leading-6 text-red-500 w-full']">
                                            Reject
                                        </button>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                            <div v-if="requestIdx !== 0" class="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref} from 'vue';
    import axios from 'axios';
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

    const requests = ref([]);

    async function getRequests(){ //displays all the pending
        try{
            const response = await axios.post("http://localhost:5000/registration", 
                {
                    mode: 'Pending'
                }
            );
            requests.value = response.data;
            
            if (!response.data || response.data.length === 0) {
                console.log("Request not found");
            }
            // console.log(response.data)
        }
        catch(err){
            console.log("error in getting requests", err)
        }
    }
    async function responseRequest(id, req_response, req_status){ //reject/approve requests
        //doesnt update instantly needs to reload, check pls uwu 
        try{
            const admin_id = localStorage.getItem('c_id')
            // console.log("function", id, req_response, req_status, admin_id)
            const response = await axios.post("http://localhost:5000/response", 
                {
                    id: id,
                    req_status: req_status,
                    req_response: req_response,
                    admin_id: admin_id
                }
            )
        }
        catch(err){
            console.log("error", err)
        }
    }
    
    onMounted(() => {
        getRequests();
    });
</script>