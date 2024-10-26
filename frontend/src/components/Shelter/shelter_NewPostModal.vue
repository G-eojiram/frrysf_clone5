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
              class="relative transform overflow-hidden rounded-lg mx-4 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

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
                  Create New Post
                </DialogTitle>
                <div>
                  <PetList @petSelected="handlePetSelected" />
                </div>
                <div class="text-sm mt-1.5">
                  <div class="flex flex-col">
                    <label for="petName" class="font-medium leading-6 text-gray-700">
                      Nickname</label>
                    <input v-model="nickname" type="text" name="petName" id="petName" placeholder="Nickname"
                      class="mt-1.5 border rounded-md p-1.5 px-6" readonly>
                  </div>
                  <div class="flex flex-col mt-1.5">
                    <label for="rehomed" class="font-medium leading-6 text-gray-700">
                      Date Re-homed</label>
                    <input v-model="daterehomed" type="text" name="rehomed" placeholder="Date Rehomed"
                      class="mt-1.5 border rounded-md p-1.5 px-6" readonly>
                  </div>
                  <div class="flex flex-col mt-1.5">
                    <label for="petBreed" class="font-medium leading-6 text-gray-700">
                      Breed / Mix</label>
                    <input v-model="breed" type="text" name="petName" id="petName" placeholder="Breed"
                      class="mt-1.5 border rounded-md p-1.5 px-6" readonly>
                  </div>
                </div>
                
                <div class="mt-2">
                  <textarea v-model="newpost" placeholder="Write a caption or description of this post..."
                    class="border rounded-lg py-[1rem] px-6 w-full h-[8rem]" />
                </div>

                <div v-if="imageUrls.length > 0" class="border border-dashed my-2">
                  <div class="px-4 my-2 mx-2 sm:col-span-2 sm:px-0">
                    <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                      <li v-for="(imageUrl, index) in imageUrls" :key="index" class="relative">
                        <div
                          class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                          <img :src="imageUrl" alt="" class="pointer-events-none w-full h-32 object-cover" />
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

                <div class="px-[2rem] py-[1rem]">
                  <div class="flex justify-between mb-3">
                    <span class="text-gray-400 text-[14px]">Add to your post</span>
                    <label for="file-input" class="cursor-pointer flex gap-3 items-center">
                      <input type="file" multiple @change="handleFileChange" id="file-input" ref="fileInput"
                        class="hidden" />
                      <img :src="images" alt="Images Icon" class="h-[2rem] w-[2rem]" />
                    </label>
                  </div>
                </div>
                <div class="flex justify-center">
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
import { ref } from 'vue'
import PetList from '@/components/Shelter/shelter_NewPostModal_dropdown_PetList.vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

// Component registration
const components = { PetList, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot };

const emit = defineEmits(['close']) // for closing the modal with close button - joey added
// Reactive state
const open = ref(true);
const fileInput = ref(null);
const imageUrls = ref([]);
const images = 'https://img.icons8.com/fluency/48/stack-of-photos.png';

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

// Remove image from list
const removeImage = (index) => {
  imageUrls.value.splice(index, 1);
}

const selectedPetInfo = ref([]);
const name = ref('');
const nickname = ref('');
const breed = ref('');
const daterehomed = ref('');

// Handle the event from the child component
function handlePetSelected(info) {
  selectedPetInfo.value = info;
  name.value = selectedPetInfo.value[0].name
  nickname.value = selectedPetInfo.value[0].nickname
  breed.value = selectedPetInfo.value[0].breed
  daterehomed.value = selectedPetInfo.value[0].rehomed
  imageUrls.value.push(
    selectedPetInfo.value[0].profile
  )
}
</script>