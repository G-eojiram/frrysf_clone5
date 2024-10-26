<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @click.self="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg mx-4 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[36.5rem] sm:p-6">

              <div class="mt-3 text-center sm:mx-4 sm:mt-0 sm:text-left">
                <div class="flex justify-end">
                  <button @click="$emit('close')" ref="cancelButtonRef">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <DialogTitle as="h3"
                  class="mb-[1.5rem] text-[1.3rem] font-semibold leading-6 text-gray-700 flex justify-center">
                  Post New Event
                </DialogTitle>
                <div
                  class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-teal-300 focus-within:ring-1 focus-within:ring-indigo-500">
                  <div>
                    <label for="title" class="sr-only">Event Title</label>
                    <input type="text" name="title" id="title"
                      class="w-full py-2.5 px-[1rem] text-lg font-medium placeholder:text-gray-400 focus:outline-none"
                      placeholder="Event Title" />
                  </div>
                  <div class="flex sm:flex-col md:flex-row sm:text-sm md:text-[13px] px-[1.1rem] gap-x-2 border-t py-2">
                    <div class="flex items-center sm:gap-x-1.5 md:gap-x-1">
                      <label for="start-datetime" class="text-gray-400">Event Start:</label>
                      <p class="sm:text-sm md:text-[12px]">{{ startDateTime }}</p>
                      <input type="datetime-local" id="start-datetime" name="start-datetime" value=""
                        ref="startDateInput" @input="handleStartDateTimeInput"
                        class="w-[1rem] h-[1rem] text-transparent bg-transparent border-none cursor-pointer focus:outline-none" />
                    </div>
                    <div class="flex items-center sm:gap-x-2 md:gap-x-1">
                      <label for="end-datetime" class="text-gray-400">Event End:</label>
                      <p class="sm:text-sm md:text-[12px]">{{ endDateTime }}</p>
                      <input type="datetime-local" id="end-datetime" name="end-datetime" value="" ref="endDateInput"
                        @input="handleEndDateTimeInput"
                        class="w-[1rem] h-[1rem] text-transparent bg-transparent border-none cursor-pointer focus:outline-none" />
                    </div>
                  </div>
                  <div class="mt-1 border-t border-gray-200">
                    <label for="caption" class="sr-only">Event Caption</label>
                    <textarea v-model="caption" name="caption"
                      placeholder="Write a caption or description of this Event..."
                      class="py-[10px] px-6 w-full h-[8rem] focus:outline-none" />
                  </div>
                  <div class="flex justify-between mb-3 mx-[1.5rem]">
                    <div>
                      <span class="text-gray-400 text-[14px]">Add to your post</span>
                    </div>
                    <div class="flex gap-4 items-center">
                      <div>
                        <label for="file-input" class="cursor-pointer flex gap-3 items-center">
                          <input type="file" multiple @change="handleFileChange" id="file-input" ref="fileInput"
                            class="hidden" />
                          <img :src="images" alt="Images Icon" class="h-[2rem] w-[2rem]" />
                        </label>
                      </div>
                      <div>
                        <button>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="25" height="25">
                            <path fill="#f03d3d"
                              d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="imageUrls.length > 0" class="border border-dashed my-2">
                  <div class="px-4 my-2 mx-2 sm:col-span-2 sm:px-0">
                    <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                      <li v-for="(imageUrl, index) in imageUrls" :key="index" class="relative">
                        <div
                          class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                          <img :src="imageUrl" alt="" class="pointer-events-none w-full h-44 object-cover" />
                          <button @click.prevent="removeImage(index)"
                            class="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" class="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="flex justify-center mt-2">
                  <button type="button"
                    class="flex rounded-lg px-[46%] bgteal justify-center py-2 text-sm font-semibold text-white shadow-sm hover:bg-bgteal sm:w-auto">
                    Post</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const emit = defineEmits(['close']) // for closing the modal

const open = ref(true);
const fileInput = ref(null);
const imageUrls = ref([]);
const images = 'https://img.icons8.com/fluency/48/stack-of-photos.png';
const startDateTime = ref('');
const endDateTime = ref('');

const handleFileChange = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (event) => {
      imageUrls.value.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  imageUrls.value.splice(index, 1);
};

const handleStartDateTimeInput = (event) => {
  const dateTime = new Date(event.target.value);
  if (dateTime.toString() === 'Invalid Date') {
    startDateTime.value = ''; // set to empty string if input value is empty
  } else {
    const formattedDateTime = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    startDateTime.value = formattedDateTime; // update the startDateTime ref
    console.log(formattedDateTime); // Output: January 19, 2003 10:30:00 AM
  }
};

const handleEndDateTimeInput = (event) => {
  const dateTime = new Date(event.target.value);
  if (dateTime.toString() === 'Invalid Date') {
    endDateTime.value = ''; // set to empty string if input value is empty
  } else {
    const formattedDateTime = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    endDateTime.value = formattedDateTime; // update the endDateTime ref
    console.log(formattedDateTime); // Output: January 19, 2003 10:30:00 AM
  }
};

const startDateInput = ref(null);
const endDateInput = ref(null);

onMounted(() => {
  if (startDateInput.value) {
    startDateInput.value.addEventListener('input', handleStartDateTimeInput);
  }
  if (endDateInput.value) {
    endDateInput.value.addEventListener('input', handleEndDateTimeInput);
  }
});

onBeforeUnmount(() => {
  if (startDateInput.value) {
    startDateInput.value.removeEventListener('input', handleStartDateTimeInput);
  }
  if (endDateInput.value) {
    endDateInput.value.removeEventListener('input', handleEndDateTimeInput);
  }
});
</script>