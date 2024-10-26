<script>
export default {
    data() {
        return {
            viewreportpost: {
                id: 1,
                username: 'Eric Jr.',
                name: 'Eric',
                lastname: 'Ramones',
                type: 'Missing Dog',
                caption: 'Found this dog at abandoned lot near STI College Davao',
                location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                animalstatus: 'Severe',
                imageUrl: require('@/assets/images/homepage.png'),
                badge: 'rescuer',
            }
        }
    },
};
</script>
<template>
    <div class="flex justify-center items-center h-full">
        <div class="border rounded-lg bg-white w-full h-fit mb-4">
            <div class="px-[2rem] py-[10px] border-b-2 flex items-center gap-x-2 text-gray-600">

                <RouterLink class="hover:text-gray-900 hover:underline">
                    <h1 class="text-sm font-semibold">
                        {{ viewreportpost.name }}
                    </h1>
                </RouterLink>
                <span class="text-[12px] border rounded-xl px-2 text-gray-500">{{ viewreportpost.badge }}</span>
            </div>
            <div class="w-full bg-slate-50">
                <img class="mx-auto flex-shrink-0 w-[50rem] object-cover" :src="viewreportpost.imageUrl"
                    alt="image post" />
            </div>
            <div class="px-[2rem] py-[2rem] flex flex-col">
                <span> {{ viewreportpost.type }}</span>
                <span> {{ viewreportpost.animalstatus }}</span>
                <span> {{ viewreportpost.location }}</span>
                <p class="text-sm font-medium text-gray-900 pt-[1rem]">{{ viewreportpost.caption }}</p>
            </div>
        </div>
    </div>
</template>