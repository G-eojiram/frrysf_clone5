<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Make sure to import useRouter if you're using RouterLink

const requests = ref([
    {
        id: 1,
        name: 'Dolends Animal Shelter',
        createdAt: 'Sept 30',
        email: 'exampleShelter@gmail.com',
        status: 'Pending',
    },
]);

function categorizedRequests() {
    const categorized = {
        Pending: [],
        Approved: [],
        Rejected: [],
    };
    requests.value.forEach(request => {
        categorized[request.status].push(request);
    });
    return categorized;
}

async function getRequests() {
    try {
        const response = await axios.post("http://localhost:5000/registration");
        requests.value = response.data;
        if (!response.data || response.data.length === 0) {
            console.log("Request not found");
        }
    }
    catch (err) {
        console.log("error in getting requests", err)
    }
}


onMounted(() => {
    getRequests();
});
</script>
<template>
    <div>
        <div v-for="(category, categoryName) in categorizedRequests()" :key="categoryName">
            <h2 class="text-sm font-semibold mb-2 ml-6">{{ categoryName }}</h2>
            <RouterLink v-for="(list, index) in category" :key="index"
                :to="{ name: 'request_preview', params: { id: list.id } }" custom v-slot="{ navigate }">
                <div @click="navigate"
                    class="bg-white shadow-md rounded-b-xl rounded-l-xl mb-4 hover:drop-shadow-xl border cursor-pointer">
                    <div class="px-[2rem] py-3 text-gray-700 grid gap-y-1">
                        <div class="my-[1rem]">
                            <div class="mb-[1rem]">
                                <span class="flex gap-3 text-[14px]">Shelter's Name:
                                    <h1 class="font-bold text-gray-600 text-[14px] flex gap-3">{{ list.sheltername }}
                                    </h1>
                                </span>
                                <span class="flex gap-5 text-[14px]">Email Address:
                                    <p class="font-semibold text-[13px]">{{ list.email }}</p>
                                </span>
                            </div>
                            <div class="flex justify-between border-t pt-[10px]">
                                <span
                                    class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset"
                                    :class="{
                                        'bg-red-50 text-red-700 ring-red-800': list.status === 'Pending',
                                        'bg-gray-50 text-gray-700 ring-gray-500': list.status === 'Rejected',
                                        'bg-green-50 text-green-700 ring-green-800': list.status === 'Approved'
                                    }">{{ list.status }}</span>
                                <span class="font-semibold text-gray-500 text-[12px]">{{ list.daterequested }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>