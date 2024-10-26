<!-- if warining
toastRef.value.showToast('warning', 'Missing inputs');

if error:
toastRef.value.showToast('error', err);

if success:
toastRef.value.showToast('success', 'succesfully save'); -->

<template>
    <div v-if="visible" :class="['fixed top-4 right-4 bg-white border', bordercolor, textcolor, 'text-gray-700 px-4 py-2 rounded-lg drop-shadow-lg transition-opacity animate-bounce',
        { 'opacity-100': visible, 'opacity-0': !visible }]" role="alert" @click="hideToast">
        <div class="flex gap-x-2">
            <component :is="iconComponent" :class="['h-6 w-6', iconColor]" />
            {{ message }}
        </div>
    </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue';
import { CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid';

const visible = ref(false);
const message = ref('');
const textcolor = ref('');
const bordercolor = ref('');
const iconComponent = ref(null);
const iconColor = ref('');

function showToast(type, msgOrErr) {

    console.log("type", type)
    if (typeof msgOrErr === 'string') {
        message.value = msgOrErr;
    } else if (msgOrErr instanceof Error) {
        message.value = msgOrErr.message;
    } else {
        console.log("toast message", message.value)
        message.value = 'An unknown error occurred';
    }

    switch (type) {
        case 'success':
            textcolor.value = 'text-green-500';
            bordercolor.value = 'border-green-500';
            iconComponent.value = CheckCircleIcon;
            iconColor.value = 'text-green-500';
            visible.value = true;
            break;
        case 'error':
            textcolor.value = 'text-red-500';
            bordercolor.value = 'border-red-500';
            iconComponent.value = ExclamationTriangleIcon;
            iconColor.value = 'text-red-500';
            visible.value = true;
            break;
        case 'warning':
            textcolor.value = 'text-yellow-500';
            bordercolor.value = 'border-yellow-500';
            iconComponent.value = ExclamationCircleIcon;
            iconColor.value = 'text-yellow-500';
            visible.value = true;
            break;
        default:
            textcolor.value = 'text-gray-500';
            bordercolor.value = 'border-red-800';
            iconComponent.value = null;
            iconColor.value = '';
    }


    let toastTimer = null;

    toastTimer = setTimeout(() => {
        visible.value = false;
    }, 3000);
}

function hideToast() {
    clearTimeout(toastTimer);
    visible.value = false;
}

// Expose the showToast function to the parent component
defineExpose({ showToast });
</script>