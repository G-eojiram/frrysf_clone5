<script>
export default {
    data() {
        return {
            // View Post
            shelterpost:
                [
                    {
                        caption: 'You can’t buy love, but you can rescue it.',
                        who: 'ViewEric',
                        imageUrl: require('@/assets/images/eric.png'),
                        dropdownOpen: false
                    },
                ],
        }
    },
};
</script>
<template>
    <div>
        <div class="my-4">
            <RouterLink to="/myshelter_feed" class="text-sm font-semibold text-gray-500 hover:text-gray-700 hover:underline">Back</RouterLink>
        </div>
        <div v-for="post in shelterpost" :key="post.id" class="border rounded-lg bg-white w-full h-fit mb-4">
            <div class="px-[2rem] py-[10px] border-b-2 grid grid-flow-col items-center justify-between">
                <span class="sr-only">header space</span>
            </div>
            <div class="w-full bg-slate-50">
                <img class="mx-auto flex-shrink-0 w-[50rem]" :src="post.imageUrl" alt="image post" />
            </div>
            <div class="px-[2rem] py-[2rem]">
                <div class="grid grid-flow-col justify-between">
                    <h1 class="flex items-center gap-4">
                        <img width="25" height="25" src="https://img.icons8.com/color/48/dog-paw-print.png"
                            alt="dog-paw-print" />
                        {{ post.who }}
                    </h1>
                    <div class="relative">
                        <button @click="post.dropdownOpen = !post.dropdownOpen" class="flex items-center">
                            <img width="12" height="12" src="https://img.icons8.com/ios-filled/50/4D4D4D/menu-2.png"
                                alt="menu-2" />
                        </button>
                        <div v-if="post.dropdownOpen"
                            class="absolute right-0 mt-2 w-[8rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <RouterLink to=""
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem">Edit post</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-sm font-medium text-gray-900 pt-[1rem]">{{ post.caption }}</p>
            </div>
        </div>
    </div>
</template>