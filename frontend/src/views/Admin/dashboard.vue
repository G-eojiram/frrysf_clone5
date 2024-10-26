<script>
import updatecard from '@/components/Admin/admin_Dasboard_updateCard.vue';
import tablelist from '@/components/Admin/admin_Dasboard_updatesTable.vue';

export default {
    components: {
        updatecard, tablelist
    },
};
</script>
<template>
    <div>
        <div>
            <updatecard />
        </div>
        <div>
            <div class="my-[1rem] border-y bg-gray-800 py-3 px-[1rem] rounded-lg">
                <span class="font-semibold text-sm text-white">Request List</span>
            </div>
            <div class="overflow-y-auto">
                <tablelist />
            </div>
        </div>
    </div>
</template>