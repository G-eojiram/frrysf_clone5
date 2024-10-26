<script>
import { MapPinIcon, UserIcon, EyeIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/vue/20/solid";

export default {
    components: {
        MapPinIcon, UserIcon, EyeIcon, ChatBubbleLeftEllipsisIcon
    },
    data() {
        return {
            viewreportpost: {
                id: 1,
                name: "Eric",
                lastname: "Ramones",
                badge: "buddy",
                about: "Im airix jr sheshhh",
                location: "#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines",
                profile: require("@/assets/images/eric.png"),
            },
        };
    },
};
</script>
<template>
    <div class="border rounded-lg py-4 bg-white shadow-sm sm:w-[20rem] md:w-[25rem] xl:w-[37rem]">
        <div class="px-[2rem] py-[10px] xl:flex gap-x-4 text-gray-600 mb-2">
            <div class="flex justify-center">
                <img class="flex-shrink-0 sm:w-44 xl:w-72 rounded-full object-cover" :src="viewreportpost.profile"
                    alt="image post" />
            </div>
            <div class="flex flex-col gap-y-1 my-auto">
                <div class="flex flex-col sm:place-items-center xl:place-items-start">
                    <div>
                        <h1 class="sm:mt-4 sm:text-base xl:text-lg font-bold">
                            {{ viewreportpost.name }} {{ viewreportpost.lastname }}
                        </h1>
                    </div>
                    <div>
                        <span
                            class="sm:text-[12px] xl:text-sm font-medium border rounded-xl w-fit px-3 py-0.5 text-gray-500 bg-slate-50">
                            {{ viewreportpost.badge }}</span>
                    </div>
                </div>
                <div class="grid grid-cols-[20px_1fr] gap-2">
                    <UserIcon class="h-5 w-5 text-gray-500" />
                    <p class="sm:text-[12px] xl:text-sm">{{ viewreportpost.about }}</p>
                </div>
                <div class="grid grid-cols-[20px_1fr] gap-2">
                    <MapPinIcon class="h-5 w-5 text-gray-500" />
                    <p class="sm:text-[12px] xl:text-sm">{{ viewreportpost.location }}</p>
                </div>
            </div>
        </div>
        <div class="flex justify-evenly items-center text-sm font-semibold">
            <RouterLink to="/viewprofile"
                class="flex gap-x-2 border rounded-lg bg-gray-50 hover:bg-gray-200 group hover:animate-pulse sm:px-4 md:px-8 xl:px-20 py-2 items-center">
                <EyeIcon class="h-6 w-6 text-gray-300 group-hover:text-gray-700" />
                <span class="text-gray-500 group-hover:text-gray-700">View Profile</span>
            </RouterLink>
            <RouterLink to="/messages"
                class="flex gap-x-3 border rounded-lg bgteal hover:animate-pulse sm:px-4 md:px-8 xl:px-20 py-2 items-center">
                <ChatBubbleLeftEllipsisIcon class="h-6 w-6 text-white" />
                <span class="text-white">Message</span>
            </RouterLink>
        </div>
    </div>
</template>
