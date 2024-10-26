<template>
  <div class="flex flex-col">
    <label for="AnimalProfiles" class="block text-sm font-medium leading-6 text-gray-700">Animal
      Profiles</label>
    <select id="AnimalProfiles" name="AnimalProfiles" @change="handleSelectionChange"
      class="mt-2 block w-full rounded-md border-0 py-2 pl-[1rem] pr-10 text-gray-800 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6 leading-relaxed">
      <option value="" selected disabled hidden>Select Animal Profile</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import axios from "axios";
const emit = defineEmits(['petSelected']);

const id = localStorage.getItem('u_id')

const options = ref([])

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

async function retrieveProfile() {
  try {
    const response = await axios.post("http://localhost:5000/profile", {
      _userid: id,
    });
    if (response.data && response.data.length > 0) {
      response.data.forEach(profile => {
        const _name_nickname = profile.name_nickname;
        const [name, nickname] = _name_nickname.split('/');

        options.value.push(
          {
            id: profile.id,
            name: capitalizeWords(name.trim()),
            nickname: capitalizeWords(nickname.trim()),
            petBreed: profile.breed,
            rehomed: profile.date_rehomed,
            profile: profile.profileurl
          }
        )
        console.log("options", options.value)

      })
    }
  }
  catch (err) {
    console.log("an error occured while retrieving profile", err)
  }
}

const selectedPetid = ref(null);
const selectedPetInfo = ref([])

// Emit the selected pet id when the selection changes
function handleSelectionChange(event) {
  selectedPetid.value = event.target.value;
  options.value.forEach(pet => {
    if (pet.id == selectedPetid.value) {
      selectedPetInfo.value.push(
        {
          name: pet.name,
          nickname: pet.nickname,
          rehomed: pet.rehomed,
          breed: pet.petBreed,
          profile: pet.profile
        }
      )
    }
  });
  emit('petSelected', selectedPetInfo.value);
}

onMounted(() => {
  retrieveProfile()
})
</script>