<template>
    <div class="font-semibold border-t text-sm rounded-b-lg">
        <button v-if="!showRescueCancelButtons && !showSuccessMessage && !showConfirmRescue && !showConfirmCancel"
            type="button"
            class="flex justify-center py-4 font-semibold w-full text-red-600 bg-slate-50 hover:bg-red-500 hover:text-white rounded-b-lg"
            @click="showRescueCancelButtons = true">
            Take Action
        </button>

        <div v-else-if="showRescueCancelButtons" class="flex justify-between font-semibold text-gray-600 rounded-b-lg">
            <button type="button" class="bg-green-100 py-4 w-full hover:bg-green-500 hover:text-white rounded-bl-lg"
                @click="showRescueCancelButtons = false; showConfirmRescue = true">
                Rescued
            </button>
            <button type="button" class="bg-red-100 py-4 w-full hover:bg-red-500 hover:text-white rounded-br-lg"
                @click="showRescueCancelButtons = false; showConfirmCancel = true">
                Cancel
            </button>
        </div>

        <div v-if="showConfirmRescue" class="flex justify-center py-4 text-[13px] gap-x-6 bg-slate-50">
            <span>Are you sure about this status?</span>
            <button type="button" class="text-green-700" @click="showSuccessMessage = true; showConfirmRescue = false">
                Yes
            </button>
            <button type="button" class="text-red-700"
                @click="showRescueCancelButtons = true; showConfirmRescue = false">
                No
            </button>
        </div>

        <div v-if="showConfirmCancel" class="flex justify-center py-4 text-[13px] gap-x-6 bg-slate-50">
            <span>Are you sure you want to cancel your action?</span>
            <button type="button" class="text-green-700"
                @click="showRescueCancelButtons = false; showConfirmCancel = false">
                Yes
            </button>
            <button type="button" class="text-red-700"
                @click="showRescueCancelButtons = true; showConfirmCancel = false">
                No
            </button>
        </div>

        <div v-if="showSuccessMessage" class="flex justify-center py-2 text-[12px] bg-green-50">
            <span>Rescued Succesfully</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showRescueCancelButtons: false,
            showSuccessMessage: false,
            showConfirmRescue: false,
            showConfirmCancel: false
        }
    }
}
</script>