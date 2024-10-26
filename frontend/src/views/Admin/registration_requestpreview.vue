<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import requestdocu from '@/components/Admin/admin_Registration_requestDocuments.vue';
    import axios from 'axios'; // Import axios
    
    // Define the route and state
    const route = useRoute();
    const request = ref({}); // Ref to hold the request data
    const showDetails = ref(false); // Ref for showDetails state

    // Function to fetch request details
    async function getRequestDetails(id) {
    try {
        const response = await axios.get(`http://localhost:5000/request_preview/${id}`);
        request.value = response.data; // Store fetched data
        console.log(response.data)

        if (!response.data || response.data.length === 0) {
            console.log("request not found bitch")
        }
    } 
    catch (error) {
        console.error('Error fetching request details:', error);
    }
    }
    
    async function responseRequest(id, req_response, req_status){
        //doesnt update instantly needs to reload, check pls uwu 
        try{
            const admin_id = localStorage.getItem('c_id')
            // console.log("function", id, req_response, req_status, admin_id)
            const response = await axios.post("http://localhost:5000/response", 
                {
                    id: id,
                    req_status: req_status,
                    req_response: req_response,
                    admin_id: admin_id
                }
            )
        }
        catch(err){
            console.log("error", err)
        }
    }


    onMounted(() => {
        const requestId = route.params.id; // Get ID from route params
        getRequestDetails(requestId); // Fetch the request details
    });
</script>

<template>
    <div id="marginright" class="lg:mx-[5rem] sm:mx-[1rem]">
        <div>
            <!-- dapat mu balik kng asa jd sya last ex. gikan dashboard, then pag e back mu balik siya sa dashboard -->
            <RouterLink to="/registration" class="flex items-center w-fit">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="text-[14px] hover:font-medium text-gray-800">Back</span>
            </RouterLink>
        </div>
        <div class="mt-[2rem]">
            <!-- <requestdocu :requestDetail="request" /> -->
            <!-- <p>Logged request data: {{ request }}</p> -->
            <requestdocu v-if="request" :requestDetail="request" />
        </div>
        <div class="mt-[1rem] border-t py-[2rem] flex justify-end gap-5 text-sm font-medium px-[1rem] text-white">
            <button
                @click.prevent = "responseRequest(route.params.id, 'Approved', 'TRUE');  refreshRoute($router)" 
                type="button" class=" border-gray-800 bg-gray-600 hover:bg-gray-500 py-2 px-[4rem] rounded-md shadow-md">
                Approve
            </button>
            <button
                @click.prevent = "responseRequest(route.params.id, 'Rejected', 'FALSE'),  refreshRoute($router)" 
                type="button" class="border-gray-800 bg-gray-800 hover:bg-gray-700 py-2 px-[4rem] rounded-md shadow-md">
                Reject
            </button>
        </div>
    </div>
</template>