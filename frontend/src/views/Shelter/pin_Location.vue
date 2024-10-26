<!-- <script>

import Map from '@/components/Map.vue';

export default {
    components: {
        Map
    },
};
</script> -->
<!-- <template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="">
                <Map />
            </div>
        </Dialog>
    </TransitionRoot>
</template> -->
<template>
    <div class="h-screen w-full bg-gray-500 opacity-0 flex justify-center items-center">
      <!-- Main content container -->
      <div class="max-w-md p-4 bg-white rounded shadow-md opacity-100">
        <!-- Your main content here -->
        <p>This is your main content!</p>
        <!-- Button to trigger the modal -->
        <button @click="showModal = true">Open Modal</button>
      </div>
  
      <!-- Modal container -->
      <div v-if="showModal" class="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-20 flex justify-center items-center">
        <!-- Modal content container -->
        <div class="max-w-md p-4 bg-red-500 rounded shadow-md">
          <!-- Your modal content here -->
          <p>This is your modal content!</p>
          <!-- Button to close the modal -->
          <button @click="showModal = false">Close Modal</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false
      }
    }
  }
  </script>