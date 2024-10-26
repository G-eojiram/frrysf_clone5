<script>
export default {
    props: {
        showEventInfo: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            //event
            events: [
                {
                    title: 'Example Title 1',
                    dateStarted: '2022-01-01',
                    dateEnded: '2022-01-31',
                    location: 'Another event caption hdusidij dsahoids dhsoia hdsais udsiudsh hdsihi saish',
                    caption: ' dsadsdsUpcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa dsadsguisad dgsuiadgsakdksua dugsaudgsaud gsuagdusg dusagduosagdus gduisgadiug duisaguidgs',
                    imageUrl: require('@/assets/images/eric.png'),
                },
                {
                    title: 'Example Title 2',
                    dateStarted: '2022-02-01',
                    dateEnded: '2022-02-28',
                    caption: 'Another event caption',
                    imageUrl: require('@/assets/images/bals.png'),
                },
                {
                    title: 'Example Title 3',
                    dateStarted: '2022-01-01',
                    dateEnded: '2022-01-31',
                    caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
                    imageUrl: require('@/assets/images/charles.png'),
                },
                {
                    title: 'Example Title 4',
                    dateStarted: '2022-01-01',
                    dateEnded: '2022-01-31',
                    caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
                    imageUrl: require('@/assets/images/bert.png'),
                },
                // Add more events here
            ],
            showEventInfo: false,
        }
    },
    methods: {
        toggleEventInfo() {
            this.showEventInfo = !this.showEventInfo;
        }
    }
};
</script>
<template>
    <div>
        <div v-if="showEventInfo" class="mt-[1rem] py-2 w-full overflow-x-auto">
            <!-- <div class="mt-[1rem] py-2 w-full overflow-x-auto"> -->
            <div class="flex">
                <div v-for="(event, index) in events" :key="index"
                    class="border bg-white rounded-lg sm:w-[20rem] lg:w-[30rem] mx-2 flex-shrink-0">
                    <div class="px-[1rem] py-2 border-b">
                        <span class="font-semibold text-lg">{{ event.title }}</span>
                    </div>
                    <div class="flex flex-col px-[1rem] py-3 gap-1 sm:text-[11px] lg:text-[14px]">
                        <span>Event Starts: <b class="font-medium sm:text-[11px] lg:text-[14px] pl-2">
                                {{ event.dateStarted }}</b></span>
                        <span>Event Ends: <b class="font-medium sm:text-[11px] lg:text-[14px] pl-2.5">
                                {{ event.dateEnded }}</b></span>
                        <div class="flex gap-x-7">
                            <label for="locaction">Location:</label>
                            <p> {{ event.location }} </p>
                        </div>
                        <p class="font-medium lg:text-[14px] mt-2 border-t py-2 text-gray-600">{{
                            event.caption }}</p>
                        <div class="flex justify-center items-center border-t-2 mt-2">
                            <img :src="event.imageUrl" alt="event image" id="imgsize"
                                class="lg:w-[23rem] lg:h-[20rem] object-cover mt-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>