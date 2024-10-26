<script setup>
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid'

const timeline = [
    {
        id: 1,
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        status: 'Successful',
        rescuetype: 'Missing Dog',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 2,
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        status: 'Successful',
        rescuetype: 'Missing Dog',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 3,
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        status: 'Successful',
        rescuetype: 'Missing Dog',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 4,
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        status: 'Successful',
        rescuetype: 'Missing Dog',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 5,
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        status: 'Successful',
        rescuetype: 'Missing Dog',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 6,
        location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
        status: 'Successful',
        rescuetype: 'Missing Dog',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
]
</script>
<template>
    <div class="flow-root">
        <ul role="list" class="-mb-8">
            <li v-for="(event, eventIdx) in timeline" :key="event.id">
                <div class="relative pb-8">
                    <span v-if="eventIdx !== timeline.length - 1"
                        class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    <div class="relative flex space-x-3">
                        <div>
                            <div class="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                                <img width="35" height="35"
                                    src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Paw-shopping-filled-color-icons-papa-vector.png"
                                    alt="external-Paw-shopping-filled-color-icons-papa-vector" />
                            </div>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                                <span class="text-[14px] font-semibold text-gray-600">{{ event.datetime }}</span>
                                <h3 class="text-sm text-gray-500">
                                    {{ event.status }} <span class="text-gray-800 font-medium">{{ event.rescuetype
                                        }}</span>
                                </h3>
                                <p class="text-[13px]">{{ event.location }}</p>
                            </div>
                            <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                <time :datetime="event.datetime">{{ event.date }}</time>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>