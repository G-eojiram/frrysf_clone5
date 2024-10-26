<template>
    <div v-if="selectedItem" class="flex justify-center items-center">
        <img v-if="selectedItem.type === 'image'" :src="selectedItem.imgUrl" alt="" class="rounded-lg"/>
        <div v-else-if="selectedItem.type === 'document'">
            <!-- Document preview component here or way para ma display sya??? -->
            <iframe :src="`/${selectedItem.filepath}`" frameborder="0" width="100%" height="500px"/>  <!-- idk wla nko na try -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectedItem: {
            type: Object,
            required: true
        }
    }
}
</script>