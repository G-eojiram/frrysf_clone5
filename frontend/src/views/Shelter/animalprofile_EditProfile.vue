<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, computed, onMounted, toRaw, reactive } from 'vue';
import { PhotoIcon } from '@heroicons/vue/24/solid'
import linkfooter from '@/components/footerLink.vue'
import prompt from '@/components/prompt_savecreatedacc.vue'
import Toast from '@/components/toast.vue';  // Ensure correct case for the file name

const toastRef = ref(null);  // Create a ref for the Toast component
const isModalpromptOpen = ref(false)

// Toggle the modal's visibility
function showPrompt() {
    retrieveData()
}
const router = useRouter();
function navigateTo(path) {
    router.push(path);
}

function handleYesClick() {
    console.log('Yes button clicked!')
    // Perform actions when the Save button is clicked
}
//for edit 
const petprofile = ref('')
let extraphotos = ref([])

const oldPhotoUrls = ref([])
const listoldPhotoUrls = ref([])
const oldProfileUrl = ref('')

const info = ref([])

//user details
const userid = localStorage.getItem('u_id')

//pet details 
const route = useRoute();
const petid = route.params.petid;

// const formData = new FormData()
const dataEntries = ref([])
//pet details
const name = ref('')
const nickname = ref('')
const daterehomed = ref('')
const genderchar = ref('')
const age = ref('')
const sizeweight = ref('')
const energylevel = ref('')
const coat = ref('')
const about = ref('')
const specialneed = ref('')
const medicalcondition = ref('')
const selectedGender = ref('')
const selectedSterilization = ref('')
const profileInput = ref(null); // Initialized with a value of null, but it will eventually hold a reference to the file input element. (profile photo)
const selectedImage = ref(null); // Initialized with a value of null, but it will eventually hold the selected image data (e.g., a URL string or a blob)
const profileToUpload = ref(null)
const fileToUploadArray = ref(null) //holds the file in handlefilechanges event function
//holds the file in handlefilechanges event function

// multiple images
const files = ref([])
const otherPhotos = ref(null)

function clearImage() {
    selectedImage.value = null; // sets the selectedImage reference to null, effectively removing the image
    if (profileInput.value) { // if the file input element exists, sets its value to an empty string, effectively clearing the file selection
        profileInput.value.value = '';
    }
}

// For select animal type and auto change the value option on animalbreed depending on what's the animal type selected.
const animaltype = ref(''); //others option
const animalbreed = ref('');
const selectedAnimalType = ref(''); //selected from the options, retrieves the ID based on the database
const selectedAnimalBreed = ref('');
const selectedAnimalTypeString = ref('') //retrieves the string exactly from the option e.g.: dog, cat, horse, bird
const selectedBreedString = ref('')

let petbreed_id = ref('')

//for dropbox/options
const animalCategory = ref([])
const breedCategory = ref([])
const status = ref([])

watch(selectedAnimalType, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        selectedAnimalBreed.value = ''; // Reset selectedAnimalBreed when selectedAnimalType changes
        vaccine_options.value = [];     // Reset the selected vaccines
        selectedVaccines.value = [];    // Reset selectedVaccines (the array of checked checkboxes)
        otherVaccines.value = '';       // Reset the other vaccines
    }
});

const clearAnimalTypeInput = () => {
    animaltype.value = '';
    selectedAnimalType.value = ''; // reset the selected animal type
};
const clearAnimalTypeBreed = () => {
    animalbreed.value = '';
    selectedAnimalBreed.value = ''; // reset the selected animal breed
};

// For Vaccines options
const vaccines = ref({});
const other_vaccine = ({
    "Other": [
        "Rabies",
        "Distemper",
        "Influenza",
        "Tetanus",
        "Bovine viral diarrhea (BVD)"
    ]
})

//VACCINES
const displayVaccines = computed(() => {
    if (selectedAnimalType.value == 'Other') {
        // return other_vaccine.Other; // Return the array directly
    } else if (vaccine_options.value && Array.isArray(vaccine_options.value)) {
        return vaccine_options.value; // Ensure vaccines is an array
    }
    return [];
});

const selectedstatus = ref('')

const vaccine_options = ref([]);
const selectedVaccines = ref([]) // initialize an empty array to store the selected vaccines
const otherVaccines = ref(''); // initialize an empty string to store the other vaccines
const allVaccines = computed(() => {
    const selectedVaccineNames = selectedVaccines.value.map(vaccine => vaccine); // Extract the vaccine names
    return [...selectedVaccineNames, ...otherVaccines.value.split(',').filter(Boolean)];
});

// spayed or neutered
const sterilization = ref([])
const nonSurgical = ref([]);
const surgical = ref([]);
const spayNeuterOptions = ref([ //"other" option value
    {
        id: 'intact',
        name: 'Intact',
        label: 'No - Intact',
        description: 'This animal has not been spayed or neutered.'
    },
    {
        id: 'NA',
        name: 'Not Applicable',
        label: 'Not Applicable',
        description: 'This animal is too young or not eligible for spaying/neutering.'
    },
    {
        id: 'unknown',
        name: 'Unknown',
        label: 'Unknown',
        description: 'This animal\'s spay/neuter status is unknown.'
    }
])

const selectedValue = ref('')
const categories = ref({
    "non-surgical": [],
    "surgical": [],
    "others": []
})

const categoriesRaw = computed(() => toRaw(categories.value));

//image handling
const handleMultipleFileChange = (event) => {
    const filesArray = event.target.files;

    for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const reader = new FileReader();
        reader.onload = (event) => {
            extraphotos.value.push({ file: file, source: event.target.result });
            files.value.push(file);//call this
        };
        reader.readAsDataURL(file);
    }
    // for (let i = 0; i < filesArray.length; i++) {
    //     const file = filesArray[i];
    //     // Directly push the File object without using FileReader
    //     files.value.push(file);
    // }
}

function handleFileChange(event) {
    const file = event.target.files[0]; // gets the first file selected by the user 
    profileToUpload.value = file;

    const reader = new FileReader(); // creates a new FileReader object, which is used to read the contents of the file
    reader.onload = (event) => { // sets up an event listener for when the file reading is complete.
        // When the file reading is complete, the onload event is triggered, and the callback function is executed:
        selectedImage.value = event.target.result; // sets the selectedImage reference to the result of the file reading (the data URL string)
    };
    reader.readAsDataURL(file); // starts reading the file as a data URL (a string representation of the file contents)
}
async function loadPetCategory() { //type from db dog cats //pet type/category rendering
    try {
        const response = await axios.get("http://localhost:5000/load-category")
        if (response.data) {
            animalCategory.value = response.data
        }
    }
    catch (err) {
        console.log("error", err)
    }
}
async function loadPetBreed() { //breed from db //load pet breed when pet type (animalCategory) is selected
    try {
        const response = await axios.post("http://localhost:5000/pet_breed",
            {
                _category_id: selectedAnimalType.value
            }
        )
        if (response.data) {
            breedCategory.value = response.data
        }

        if (petbreed_id) {
            selectedAnimalBreed.value = petbreed_id.value
        }
    }
    catch (err) {
        console.log("error", err)
    }
}
//load vaccines when pet type (animalCategory) is selected
async function loadVaccineOptions() { //ovi nmn ;-; load vaccine
    try {
        const response = await axios.post("http://localhost:5000/vaccine",
            {
                _category_id: selectedAnimalType.value
            }
        )
        if (response) {
            vaccine_options.value = response.data
        }
    }
    catch (err) {
        console.log("error in loading vaccines", err)
    }
}
//load sterilization base on gender selectedGender
async function loadSterilization() { //kwaon tung sa db tas e load ;-; ovi
    try {
        const response = await axios.post("http://localhost:5000/sterilization",
            {
                _gender: selectedGender.value
            }
        )

        console.log("Sterilization response:", response.data); // Log the response data

        if (response && response.data) {
            categories.value = {
                "non-surgical": [],
                "surgical": [],
                "others": []
            };

            sterilization.value = response.data;
            categorizedSterilization(); // Categorize after loading

            categories.value = {
                "non-surgical": [...categories.value["non-surgical"]],
                "surgical": [...categories.value["surgical"]],
                "others": [...categories.value["others"], ...spayNeuterOptions.value]
            };
        }
    }
    catch (err) {
        console.log("error in loading sterilization", err)
    }
}
function categorizedSterilization() { //categorize sterilization from load sterilization (e.g. surgical, non surgical)
    try {
        const keys = Object.keys(categories.value);

        if (!Array.isArray(sterilization.value)) {
            console.error("sterilization.value is not an array:", sterilization.value);
            return;
        }

        sterilization.value.forEach(request => {
            if (categories.value[request.type]) {
                categories.value[request.type].push(request);
            }
            else {
                console.warn(`Unknown type '${request.type}' encountered.`);
                // If type doesn't match 'non-surgical' or 'surgical', add to 'others'
                categories.value["others"].push({
                    id: request.id || 'unknown',
                    value: request.type || 'Unknown',
                    label: request.label || 'Unknown',
                    description: request.description || 'No description available'
                });
            }
        });

        // console.log("Categories", categories.value);
        console.log("category", categories.value)

        // Assign categorized data to separate refs
        nonSurgical.value = categories.value["non-surgical"];
        surgical.value = categories.value["surgical"];

    }
    catch (err) {
        console.log("error in categorizing sterilization", err)
    }
}
async function loadPetStatus() { // load pet status... tf do u want 
    try {
        const response = await axios.get("http://localhost:5000/pet_status")
        if (response) {
            status.value = response.data
        }
    }
    catch (err) {
        console.log("error in loading sterilization", err)
    }
}
async function retrieveData() { //for updating, saves the data to a formdata
    const formData = new FormData();

    const newPhotoUrls = extraphotos.value.map(fileObj => fileObj.source);
    const photosToUpload = newPhotoUrls.filter(url => !oldPhotoUrls.value.includes(url));
    console.log("Photos to upload:", oldPhotoUrls.value);

    dataEntries.value = [];
    const vaccineArray = getSelectedVaccineIds();

    dataEntries.value = [
        ['pet_id', petid],
        ['id', localStorage.getItem('u_id')],
        ['gender', `${genderchar.value}`],
        ['pet_category_id', selectedAnimalType.value],
        ['other_pet_category', animaltype.value],
        ['breed_id', selectedAnimalBreed.value],
        ['other_breed', animalbreed.value],
        ['status', selectedstatus.value],
        ['name', name.value],
        ['nickname', nickname.value],
        ['daterehomed', daterehomed.value],
        ['energylevel', energylevel.value],
        ['age', age.value],
        ['sizeweight', sizeweight.value],
        ['coat', coat.value],
        ['about', about.value],
        ['special_needs', specialneed.value],
        ['med_condition', medicalcondition.value],
        // ['vaccines', vaccineArray],
        ['other_vaccines', otherVaccines.value],
        ['other_sterilization', `${selectedSterilization.value}`],
        ['sterilization_id', `${getSelectedSterilization()}`]
    ];

    // Append vaccines
    vaccineArray.forEach((vaccineId) => {
        formData.append(`vaccines`, vaccineId);
    });

    // Append profile image if available
    if (oldProfileUrl.value) {
        formData.append('old_profile', oldProfileUrl.value);
    }

    if (selectedImage.value) {
        formData.append('new_profile', profileToUpload.value);
    }

    files.value.forEach((file) => {
        formData.append('files', file); // Append the actual File object
    });
    oldPhotoUrls.value.forEach((file) => {
        formData.append('old_files', file.source)
    })
    listoldPhotoUrls.value.forEach((file) => {
        formData.append('list_of_old_files', file.source)
    })
    // Append other form data
    dataEntries.value.forEach(([key, value]) => formData.append(key, value));

    // Debugging: Log FormData contents
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    // Validate required fields
    const name_ = formData.get('name');
    const gender_ = formData.get('gender');
    const pet_ = formData.get('pet_category_id');
    const pet2_ = formData.get('other_pet_category');
    const status_ = formData.get('status');
    const steril_ = formData.get('other_sterilization');
    const steril2_ = formData.get('sterilization_id');

    if (name_ && gender_ && status_ && (pet_ || pet2_) && (steril_ || steril2_)) {
        await updatePetDetails(formData);
    } else {
        if (toastRef.value) {
            toastRef.value.showToast('Error: Missing inputs');
        }
    }
}
async function loadPetDetails() {
    try {
        // Load the pet profile
        const response = await axios.post("http://localhost:5000/profile", {
            _userid: userid,
            _petid: petid
        });

        console.log("api response", response.data)
        if (response.data && response.data.length > 0) {
            const profile = response.data[0];  // Assuming response has only one profile for simplicity

            // Load the vaccine options first

            const _name_nickname = profile.name_nickname;
            const [nameonly, nicknameonly] = _name_nickname.split('/');

            if (profile.additionalphotos && profile.additionalphotos != "No additional photos") {
                extraphotos.value = profile.additionalphotos.split(',').map(url => ({
                    source: url.trim()
                }));
                oldPhotoUrls.value = profile.additionalphotos.split(',').map(url => ({
                    source: url.trim()
                }));
                listoldPhotoUrls.value = profile.additionalphotos.split(',').map(url => ({
                    source: url.trim()
                }));
            }

            //     qrphoto: profile.qr,
            //     extraphotos: extraphotos,
            //     imageUrl: profile.profileurl
            name.value = nameonly
            nickname.value = nicknameonly
            daterehomed.value = profile.date_rehomed
            energylevel.value = profile.energylevel || "";
            coat.value = profile.coat
            sizeweight.value = profile.size
            age.value = profile.age
            about.value = profile.about
            specialneed.value = profile.need
            medicalcondition.value = profile.condition
            selectedImage.value = profile.profileurl
            oldProfileUrl.value = profile.profileurl
            // Set form values
            petprofile.value = profile.profileurl;
            selectedAnimalType.value = profile.pet_category_id;
            selectedAnimalBreed.value = profile.breed_id
            petbreed_id.value = profile.breed_id;
            selectedstatus.value = profile.status_id;
            selectedGender.value = profile.gender.toLowerCase() === 'f' ? 'female' : 'male';
            specialneed.value = profile.need

            await loadVaccineOptions();

            // Process vaccine data (after vaccine options are loaded)
            const petVaccines = profile.vaccinename.split(',').map(vaccine => vaccine.trim());
            const otherVaccinesArray = [];
            petVaccines.forEach(vaccine => {
                console.log(vaccine_options.value)
                const matchingOption = vaccine_options.value.find(option => option.name.toLowerCase() === vaccine.toLowerCase());
                if (matchingOption) {
                    selectedVaccines.value.push(matchingOption.name);
                } else {
                    otherVaccinesArray.push(vaccine);
                }
            });
            otherVaccines.value = otherVaccinesArray.join(', ');

            await loadSterilization();

            // Pre-select sterilization option
            const profileSterilizedValue = profile.sterilization ? profile.sterilization.toLowerCase() : ''; // Ensure it's defined
            const matchingSterilizationOption = sterilization.value.find(option => option.name.toLowerCase() === profileSterilizedValue);

            if (matchingSterilizationOption) {
                selectedSterilization.value = matchingSterilizationOption.name; // Found in sterilization options
            } else {
                const matchingSpayNeuterOption = spayNeuterOptions.value.find(option => option.name.toLowerCase() === profileSterilizedValue);
                if (matchingSpayNeuterOption) {
                    selectedSterilization.value = matchingSpayNeuterOption.name; // Found in spay/neuter options
                }
            }
        }

    } catch (err) {
        if (toastRef.value) {
            toastRef.value.showToast(err);
        }
    }
}
async function updatePetDetails(formData) {
    try {
        const response = await axios.post("http://localhost:5000/update_pet_profile",
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' } // Correct header placement
            }
        )
        if (response.data.success) {
            navigateTo({
                path: `/view_animalprofileform/${petid}`,
                query: { showToast: true, message: 'Pet Profile Saved Successfuly', from: 'edit' }
            });
        }
        else {
            if (toastRef.value) {
                toastRef.value.showToast(response.data.message);
            }
        }
    }
    catch (err) {
        console.log("error occured when updating", err)
    }
}
//SMALL FUNCTIONS
const removeImage = (index) => {
    extraphotos.value.splice(index, 1)
    oldPhotoUrls.value.splice(index, 1)
}
function getSelectedOption(event) {
    const selectedOption = event.target.options[event.target.selectedIndex].text;
    energylevel.value = selectedOption
}
function getSelectedVaccineIds() {
    return selectedVaccines.value
        .map(selectedName => {
            const matchingVaccine = vaccine_options.value.find(vaccine => vaccine.name === selectedName);
            return matchingVaccine ? matchingVaccine.id : null; // Handle unmatched names
        })
        .filter(id => id !== null);
}
function getSelectedSterilization() {
    const selectedSterilizationId = sterilization.value.find(sterilization => sterilization.name === selectedValue.value)?.id ?? null;
    return selectedSterilizationId;
}

let qrgenerated = ref(false)
let qrphotosrc = ref(null)
function generateQR() {
    //for qr
    let qrvalue = window.location.href;
    qrphotosrc.value = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrvalue;
    qrgenerated.value = true

    console.log("qr generated", qrgenerated.value)
}

//watcher
watch(selectedGender, (value) => {//watch for breed
    if (value == 'male') {
        genderchar.value = 'm'
    }
    else {
        genderchar.value = 'f'
    }
});
watch(selectedAnimalType, (newValue) => { //watch for breed
    if (newValue === 'Other') {
        selectedAnimalTypeString.value = newValue;
        breedCategory.value = ''
    }
    else {
        // Ensure animalCategory is an array and defined before using find
        if (Array.isArray(animalCategory.value)) {
            const selected = animalCategory.value.find(item => item.id === newValue);
            selectedAnimalTypeString.value = selected ? selected.pet_category : '';
            loadPetBreed()
            loadVaccineOptions()
        } else {
            console.error("animalCategory is not an array or is undefined");
            selectedAnimalTypeString.value = '';
        }
    }
});
watch(selectedAnimalType, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        selectedAnimalBreed.value = ''; // reset selectedAnimalBreed when selectedAnimalType changes
        vaccine_options.value = []; // reset the selected vaccines when animal type changes
        // otherVaccines.value = ''; // reset the other vaccines when animal type changes
        loadPetBreed();
    }
}, { immediate: true });
watch(selectedGender, (newValue) => { //watch for sterilization
    if (newValue) {
        selectedGender.value = newValue;

        categories.value = {
            "non-surgical": [],
            "surgical": [],
            "others": []
        };
        loadSterilization();
    }
});
const categoriesLoaded = ref(false);
watch(() => categories.value, (newVal) => {//i forgot where dis used basta ayaw tanggala 
    if (newVal && Object.keys(newVal).length > 0) {
        categoriesLoaded.value = true;
    }
})

onMounted(() => { //pag load sa page mag load ni =)
    //data rendering :'D
    loadPetCategory()
    loadPetStatus()
    loadPetDetails()
    generateQR()
})
</script>

<template>
    <div>
        <div id="marginright" class="pb-[1rem] lg:mx-[3rem] flex justify-between items-center">
            <div>
                <RouterLink :to="{ name: 'viewanimalprofile', params: { petid } }" class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-[14px] hover:font-medium">Back</span>
                </RouterLink>
            </div>
        </div>
        <form>
            <div id="margin" class="space-y-12 sm:mx-[3rem] md:mx-[2rem] lg:mx-[10rem] my-[2.5rem]">
                <div class="border-b border-gray-900/10 pb-7">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Animal Profile</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">Create a comprehensive profile for this animal,
                        including its breed, age, size, behavior, and medical history.</p>
                    <div class="mt-10 border-t pt-[2rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="profile-photo" class="block text-sm font-medium leading-6 text-gray-900">
                                Profile photo</label>
                            <div :class="{ 'py-5': !selectedImage, 'py-2': selectedImage }"
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                <div class="text-center" v-if="!selectedImage">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label for="profile-photo"
                                            class="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500">
                                            <span>Upload a file</span>
                                            <input id="profile-photo" ref="profileInput" name="profile-photo"
                                                type="file" class="sr-only" @change="handleFileChange" />
                                        </label>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <div v-else class="flex justify-center items-center h-full w-full relative">
                                    <img :src="selectedImage" class="max-w-[15rem] max-h-[15rem] rounded-md" />
                                    <button @click="clearImage"
                                        class="absolute top-2 sm:right-[1rem] lg:right-[8.1rem] text-gray-600 hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-2 sm:col-span-full">
                            <label for="qr-photo" class="block text-sm font-medium leading-6 text-gray-900">
                                QR Code </label>
                            <div :class="{ 'py-5': !qrgenerated, 'py-2': qrgenerated }"
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                <div class="flex justify-center items-center h-full w-full relative">
                                    <img :src="qrphotosrc" class="max-w-[15rem] max-h-[15rem] rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-[1rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="given-name"
                                class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div class="mt-2">
                                <input v-model="name" type="text" name="given-name" id="given-name"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="alias"
                                class="block text-sm font-medium leading-6 text-gray-900">Nickname</label>
                            <div class="mt-2">
                                <input v-model="nickname" type="text" name="alias" id="alias"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="rehomed" class="lg:col-span-1 sm:col-span-full">
                            <label for="rehome" class="block text-sm font-medium leading-6 text-gray-900">
                                Date Re-homed</label>
                            <div class="mt-2">
                                <input v-model="daterehomed" type="date" name="rehome" id="rehome"
                                    class="border p-1 rounded-lg px-[1rem] w-full">
                            </div>
                        </div>
                        <div id="anitype" class="lg:col-span-2 sm:col-span-full">
                            <label for="animaltype" class="block text-sm font-medium leading-6 text-gray-900">Pet
                                Type</label>
                            <div class="mt-2">
                                <select v-if="selectedAnimalType !== 'Other'" id="animaltype" name="animaltype"
                                    v-model="selectedAnimalType"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Animal Type</option>
                                    <option v-for="(item, index) in animalCategory" :key="index" :value="item.id">{{
                                        item.pet_category }} </option>
                                    <option value="Other">Other</option>
                                </select>
                                <div v-else class="flex gap-2 items-center">
                                    <input type="text" v-model="animaltype" name="animaltype" id="animaltype"
                                        placeholder="Type of Furry Animal"
                                        class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                                    <button @click="clearAnimalTypeInput" class="w-4 h-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="breed" class="lg:col-span-2 sm:col-span-full">
                            <label for="animalbreed" class="block text-sm font-medium leading-6 text-gray-900">
                                Breed / Mix</label>
                            <div class="mt-2">
                                <select v-if="selectedAnimalTypeString && (selectedBreedString !== 'Other')"
                                    id="animalbreed" name="animalbreed" v-model="selectedAnimalBreed"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select {{ selectedAnimalTypeString }}
                                        Breed/Mix</option>
                                    <option v-for="(breed, index) in breedCategory" :key="index" :value="breed.id">{{
                                        breed.name }}</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div v-else class="flex gap-2 items-center">
                                    <input type="text" v-model="animalbreed" name="animalbreed" id="animalbreed"
                                        :placeholder="selectedBreedString === 'Other' ? 'Type of Furry Animal Breed/Mix' : `Type of ${selectedAnimalTypeString} Breed/Mix`"
                                        class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                                    <button v-if="selectedBreedString === 'Other'" @click.prevent="clearAnimalTypeBreed"
                                        class="w-4 h-4 lg:mr-[1rem]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="gender" class="lg:col-span-1 sm:col-span-full">
                            <label for="animalGender"
                                class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                            <div class="mt-2">
                                <select v-model="selectedGender" id="animalGender" name="animalGender"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div id="fur" class="md:col-span-4 sm:col-span-full">
                            <label for="coatfur" class="block text-sm font-medium leading-6 text-gray-900">
                                Coat / Fur</label>
                            <div class="mt-2">
                                <input v-model="coat" type="text" name="coatfur" id="coatfur"
                                    placeholder="ex. Short, dark-brown coat with a slight wave"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="age" class="md:col-span-2 sm:col-span-full">
                            <label for="animalAge" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
                            <div class="mt-2">
                                <input v-model="age" type="text" name="animalAge" id="animalAge"
                                    placeholder="Ex. 2 yrs old"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="size" class="md:col-span-4 sm:col-span-full">
                            <label for="animalSize" class="block text-sm font-medium leading-6 text-gray-900">Size &
                                Weight</label>
                            <div class="mt-2">
                                <input v-model="sizeweight" type="text" name="animalSize" id="animalSize"
                                    placeholder="ex. 38 pounds, 59 inches tall"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="lvl" class="md:col-span-2 sm:col-span-full">
                            <label for="energyLvl" class="block text-sm font-medium leading-6 text-gray-900">Energy
                                Level</label>
                            <div class="mt-2">
                                <select id="energyLvl" name="energyLvl" v-model="energylevel"
                                    @change="getSelectedOption($event)"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" disabled hidden>Select Energy Level Status</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Medium-High">Medium-High</option>
                                    <option value="High">High</option>
                                    <option value="Very-High">Very High</option>
                                </select>
                            </div>
                        </div>
                        <div id="lvl" class="md:col-span-2 sm:col-span-full">
                            <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
                            <div class="mt-2">
                                <select id="status" name="status" v-model="selectedstatus"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Pet Status</option>
                                    <option v-for="(status, index) in status" :key="index" :value="status.id">{{
                                        status.name }} </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-span-full border-t border-gray-900/10">
                            <div class="border-b border-gray-900/10 py-5">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Health and Medical</h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">Provide details about the animal's
                                    current health, including vaccinations, medical conditions, and treatment history.
                                </p>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <div class="lg:flex items-center gap-3">
                                <h4 class="block text-sm font-medium leading-6 text-gray-900">
                                    Vaccinations Status</h4>
                                <p class="font-normal text-[13px] text-gray-500">( Please select one or more of the
                                    following vaccination options this animal has received. )</p>
                            </div>
                            <div
                                class="mt-4 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 text-sm leading-6">
                                <div v-for="(option, index) in displayVaccines" :key="index"
                                    class="flex items-center mx-6">
                                    <div>
                                        <input type="checkbox" :id="'checkbox' + (index + 1)" v-model="selectedVaccines"
                                            :value="option.name"
                                            class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600">
                                    </div>
                                    <div>
                                        <label :for="'checkbox' + (index + 1)"
                                            class="font-medium text-gray-600 pl-[.50rem]">{{ option.name }}</label>
                                    </div>
                                </div>
                                <div class="col-span-full">
                                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Other
                                        Vaccines</label>
                                    <div class="mt-2 flex gap-x-3">
                                        <textarea v-model="otherVaccines"
                                            class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="MedConditions" class="block text-sm font-medium leading-6 text-gray-900">
                                Medical Conditions
                            </label>
                            <div class="mt-2 flex gap-x-3">
                                <textarea type="text" v-model="medicalcondition" name="MedConditions" id="MedConditions"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-full">
                            <label for="specialNeeds" class="block text-sm font-medium leading-6 text-gray-900">
                                Special Needs
                            </label>
                            <div class="mt-2 flex gap-x-3">
                                <textarea type="text" v-model="specialneed" name="specialNeeds" id="specialNeeds"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div v-if="categoriesLoaded" class="sm:col-span-full">
                            <h4 class="font-medium text-gray-900">
                                Has this animal been sterilized?
                            </h4>
                            <div v-for="[categoryname, options] in Object.entries(categoriesRaw)" :key="categoryname"
                                class="mt-4 space-y-2">
                                <span v-if="categoryname !== 'None'" class="font-medium text-sm text-gray-900">
                                    {{ categoryname }}
                                </span>
                                <div v-if="options.length > 0" v-for="(option, index) in options" :key="index"
                                    class="relative flex gap-x-3">
                                    <div class="flex h-6 items-center">
                                        <input :id="option.id" name="spayNeuterStatus" type="radio" :value="option.name"
                                            v-model="selectedSterilization"
                                            class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                                            @input="selectedValue = $event.target.value" />
                                    </div>
                                    <div class="lg:flex text-sm leading-6">
                                        <label :for="option.id" class="font-medium text-gray-700 pr-[1rem]">
                                            {{ option.name }}
                                        </label>
                                        <p class="text-gray-600">{{ option.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full border-t border-gray-900/10">
                            <div class="border-b border-gray-900/10 py-5">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Other Information
                                </h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">
                                    Share other important information related to this furry animal. This
                                    information
                                    you've provided for this animal can
                                    help potential adopters to learn more about its background, personality, and
                                    needs.
                                </p>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="aboutInfo" class="block text-sm font-medium leading-6 text-gray-900">
                                Tell me more about this Furry Animal</label>
                            <div class="mt-2">
                                <textarea v-model="about" id="aboutInfo" name="aboutInfo" rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="otherPhotos"
                                class="block text-sm font-medium leading-6 text-gray-900">Photos</label>
                            <div class="px-[1rem] py-[1rem]">
                                <div class="px-4 sm:col-span-2 sm:px-0">
                                    <ul role="list"
                                        class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                        <li v-for="(file, index) in extraphotos" :key="file.source" class="relative">
                                            <div
                                                class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                                <img :src="file.source" alt=""
                                                    class="pointer-events-none w-80 h-80 object-cover" />
                                                <button @click.prevent="removeImage(index)"
                                                    class="absolute top-0 right-0 p-1 text-red-700 hover:text-red-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" stroke-width="2"
                                                        class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mt-3">
                                    <label for="otherPhotos" class="cursor-pointer flex items-center gap-x-2">
                                        <input type="file" multiple @change="handleMultipleFileChange" id="otherPhotos"
                                            ref="otherPhotos" class="hidden" />
                                        <img width="24" height="24"
                                            src="https://img.icons8.com/fluency/48/stack-of-photos.png"
                                            alt="stack-of-photos" />
                                        <span class="font-medium text-gray-700 text-[14px]">Add more
                                            photos</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-end gap-x-6">
                    <RouterLink to="/animalprofile" class="text-sm font-semibold leading-6 text-gray-900">
                        Cancel</RouterLink>
                    <button type="button" @click="showPrompt"
                        class="rounded-md bgteal px-[2rem] py-2 text-sm font-semibold text-white shadow-sm hover:bg-bgteal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                        Save Profile</button>
                </div>
            </div>
        </form>
        <prompt v-model:isOpen="isModalpromptOpen" @yes-clicked="handleYesClick" />
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>

        <Toast ref="toastRef" @closed="refreshRoute($router)" />
    </div>
</template>
