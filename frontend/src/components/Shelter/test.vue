<script setup>
import { ref } from 'vue';

// Event data
const events = ref([
    {
        id: 1,
        title: 'Example Title 1',
        dateStarted: '2022-01-01',
        dateEnded: '2022-01-31',
        location: 'Another event caption hdusidij dsahoids dhsoia hdsais udsiudsh hdsihi saish',
        caption: ' dsadsdsUpcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa dsadsguisad dgsuiadgsakdksua dugsaudgsaud gsuagdusg dusagduosagdus gduisgadiug duisaguidgs',
        imageUrl: require('@/assets/images/eric.png'),
    },
    {
        id: 2,
        title: 'Example Title 2',
        dateStarted: '2022-02-01',
        dateEnded: '2022-02-28',
        caption: 'Another event caption',
        imageUrl: require('@/assets/images/bals.png'),
    },
    {
        id: 3,
        title: 'Example Title 3',
        dateStarted: '2022-01-01',
        dateEnded: '2022-01-31',
        caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
        imageUrl: require('@/assets/images/charles.png'),
    },
    {
        id: 4,
        title: 'Example Title 4 fhdjuk duhdsosa  idhoiashdioas dihaio',
        dateStarted: '2022-01-01',
        dateEnded: '2022-01-31',
        caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
        imageUrl: require('@/assets/images/bert.png'),
    },
    {
        id: 5,
        title: 'Example Title 4 fhdjuk duhdsosa  idhoiashdioas dihaio',
        dateStarted: '2022-01-01',
        dateEnded: '2022-01-31',
        caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
        imageUrl: require('@/assets/images/homepage.png'),
    },

    // Add more events here
]);
</script>

<template>
    <div class="border rounded-xl w-full overflow-hidden">
        <div class="border-b-2 p-2 px-6">
            <span class="text-sm font-semibold">Featured Events</span>
        </div>
        <div class="my-4 w-full overflow-x-auto">
            <div class="flex mb-4 mx-4 gap-x-3">
                <div v-for="(event, index) in events" :key="index"
                    class="flex flex-col flex-shrink-0 overflow-hidden w-[15rem] h-[18rem]">
                   
                    <div class="flex justify-center w-[15rem]">
                        <img :src="event.imageUrl" alt="event image" id="imgsize"
                            class="lg:w-[15rem] lg:h-[15rem] object-cover rounded-3xl">
                    </div>
                    <div class="p-2 px-4 flex justify-center">
                        <p class="text-sm font-medium truncate">{{ event.title }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>