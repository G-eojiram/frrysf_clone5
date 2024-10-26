<template>
    <div>
        <dl
            class="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0">
            <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
                <dt class="text-base font-medium text-gray-600">{{ item.name }}</dt>
                <dd class="mt-1 flex items-center justify-between">
                    <div class="flex items-baseline text-3xl font-semibold"
                        :class="[item.name === 'Ratings' ? 'text-amber-500' : item.name === 'On-going Operations' ? 'text-red-500' : 'text-gray-500']">
                        {{ item.stat }}
                    </div>
                    <div>
                        <img :src="item.icon" class="h-10 w-10" />
                    </div>
                </dd>
            </div>
        </dl>
    </div>
</template>

<script setup>
import { ArrowTrendingUpIcon , BellAlertIcon  } from '@heroicons/vue/20/solid'

const stats = [
    { name: 'Ratings', stat: '0', icon: 'https://img.icons8.com/external-filled-line-gradient-andi-nur-abdillah/64/external-Star-survey-(filled-line)-filled-line-gradient-andi-nur-abdillah.png' },
    { name: 'On-going Operations', stat: '0', icon: 'https://img.icons8.com/color/48/push-notifications.png' },
]
</script>