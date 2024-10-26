<template>
    <div>
        <div class="">
            <div class="grid grid-cols-1 gap-2 bg-white/5 sm:grid-cols-1 lg:grid-cols-3">
                <div v-for="stat in stats" :key="stat.status" class="bg-gray-800 rounded-lg px-4 py-6 sm:px-6 lg:px-8">
                    <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.status }}</p>
                    <p class="mt-2 flex items-baseline gap-x-2">
                        <span class="text-4xl font-semibold tracking-tight text-white">{{ stat.count }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const stats = ref([])

async function retrieveStatus() {
    try {
        const response = await axios.get("http://localhost:5000/status")

        response.data.forEach(item => {
            stats.value.push({
                status: item.status,
                count: item.count
            });
        });
        console.log(stats)
    }
    catch (err) {
        console.log("error", err)
    }
}

onMounted(() => {
    retrieveStatus();
});

</script>