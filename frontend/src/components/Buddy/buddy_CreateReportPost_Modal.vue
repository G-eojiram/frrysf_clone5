<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @click.self="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-left sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white shadow-lg transition-all sm:max-w-[60rem] sm:mx-4 sm:w-full p-6">
              <div class="flex justify-between items-center">
                <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                  Create Report
                </DialogTitle>
                <button @click="$emit('close')" ref="cancelButtonRef" class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="mt-4 overflow-hidden text-gray-700 flex flex-col gap-y-4">
                <div class="flex items-center gap-x-3">
                  <img class="h-16 w-16 border border-gray-500 rounded-full object-cover" :src="profileUrl"
                    alt="profile image" />
                  <div class="flex flex-col gap-y-1">
                    <span class="text-base font-medium">Reporter Name</span>
                    <select
                      class="border text-gray-700 bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5  inline-flex text-left  ">
                      <option value="" selected disabled hidden>Report Type</option>
                      <option value="Missing">Missing</option>
                      <option value="Abandoned">Stray</option>
                    </select>
                  </div>
                </div>
                <div class="text-sm">
                  <div class="py-2 flex flex-col gap-y-2">
                    <label for="petcategory" class="font-medium">Pet Category</label>
                    <select v-model="selectedCategory" id="petcategory"
                      class="text-gray-700 bg-slate-50 block w-full p-2.5 border rounded-lg ">
                      <option value="" selected disabled hidden>Select Pet Category</option>
                      <option v-for="(item, index) in category" :key="index" :value="item.id">{{ item.pet_category }}
                      </option>
                    </select>
                  </div>
                  <div class="py-2 flex flex-col gap-y-2">
                    <div>
                      <label for="location" class="font-medium">Location</label>
                      <input id="location" placeholder="Enter your Location"
                        class="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
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
                  <div class="py-2 flex flex-col gap-y-2">
                    <label for="petcondition" class="font-medium">Pet Condition</label>
                    <textarea name="petcondition" id="petcondition" placeholder="Animal Status"
                      class="border rounded-lg py-2 px-4"></textarea>
                  </div>
                  <label for="reportdetails" class="font-medium">Report Details</label>
                  <div class="flex flex-col gap-y-2 border rounded-lg mt-2">
                    <textarea name="reportdetails" id="reportdetails"
                      placeholder="Write a caption or a description about the pet situation"
                      class="py-2 px-4 rounded-lg"></textarea>
                    <!-- Display images -->
                    <div v-if="imageUrls.length > 0" class="grid grid-cols-1 place-items-center gap-1 border-t">
                      <div v-for="(imageUrl, index) in imageUrls" :key="index" class="relative mx-1">
                        <img :src="imageUrl" alt="Uploaded Image"
                          class="max-w-full max-h-[300px] object-contain border" />
                        <button @click="removeImage(index)"
                          class="absolute top-0 right-0 p-1 text-red-500 hover:text-red-800">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between my-3 mx-[1.5rem]">
                    <div>
                      <span class="text-gray-400 text-[12px]">Add to your post</span>
                    </div>
                    <div class="flex gap-4 items-center">
                      <div>
                        <label for="file-input" class="cursor-pointer flex gap-3 items-center">
                          <input type="file" multiple @change="handleFileChange" id="file-input" ref="fileInput"
                            class="hidden" />
                          <img :src="images" alt="Images Icon" class="h-[2rem] w-[2rem]" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end w-full mt-4">
                <button type="button" @click="$emit('close')"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Report
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import axios from "axios"
import { onMounted } from 'vue';

const fileInput = ref(null);
const imageUrls = ref([]);
const images = 'https://img.icons8.com/fluency/48/stack-of-photos.png';
const category = ref([]);

const selectedCategory = ''

// Handle file change and load images
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
}
async function getCategory() {
  try {
    const response = await axios.get("http://localhost:5000/load-category")
    category.value = response.data
  }
  catch (err) {
    console.log("error", err)
  }
  console.log(category.value)
}

// Remove image from list
const removeImage = (index) => {
  imageUrls.value.splice(index, 1);
}

const emit = defineEmits(['close']) // for closing the modal
const open = ref(true)

onMounted(() => {
  getCategory()
});
</Script>
