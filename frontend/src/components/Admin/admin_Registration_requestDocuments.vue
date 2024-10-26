<template>
    <div>
        <div class="border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
                <div class="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Shelter's Name</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ requestDetail.sheltername }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ requestDetail.email }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Request Status</dt>
                    <div class="hidden sm:block">
                        <span
                            class="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                            {{ requestDetail.status }}
                        </span></div>
                </div>
                <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <div>
                            <ul role="list"
                                class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-7 xl:gap-x-3">
                                <li v-for="imgs in imgDocuments" :key="imgs.imgUrl"
                                    @click="selectItem({ type: 'image', imgUrl: imgs.imgUrl })">
                                    <div
                                        class="group aspect-h-7 aspect-w-10 block w-fit overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                        <img :src="imgs.imgUrl" alt=""
                                            class="cursor-pointer w-[7rem] h-[9rem] object-cover group-hover:opacity-75" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-[1rem]">
                            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <li v-for="file in fileDocuments" :key="file.filename"
                                    class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div class="flex w-0 flex-1 items-center">
                                        <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span class="truncate font-medium">{{ file.filename }}</span>
                                        </div>
                                    </div>
                                    <div class="ml-4 flex-shrink-0">
                                        <button type="button"
                                            @click="selectItem({ type: 'document', filepath: file.filepath })"
                                            class="font-medium text-gray-600 hover:text-gray-500">View</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </div>
            </dl>
        </div>
        <div>
            <div class="border-t w-full py-6">
                <span class="text-sm font-medium leading-6 text-gray-900">Douments Preview</span>
            </div>
            <previw :selected-item="selectedItem" />
        </div>
    </div>
</template>

<script>
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import previw from "@/components/Admin/admin_RequestDocu_documentPreview.vue"
import axios from "axios"

export default {
    components: {
        previw, PaperClipIcon
    },
    data() {
        return {
            data() {
                return {
                    document1: '',
                    document2: '',
                }
            },
            selectedItem: null,

            imgDocuments: [],
            fileDocuments: [],
        }
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item
        },
        initializeDocuments() {
            if (this.requestDetail.documents) {
                const documentsArray = this.requestDetail.documents.split(',').map(doc => doc.trim());
                this.document1 = documentsArray[0] || '';
                this.document2 = documentsArray[1] || '';
            } 
        },
        async retrieveFiles(){
            try{
                let id = this.requestDetail.shelterid
                const response = await axios.get(`http://localhost:5000/request_preview/${id}/image`, 
                    {
                        params: {
                            document_1: this.document1,
                            document_2: this.document2
                        }
                    }
                );

                const Url1 = response.data.image1.publicUrl;  // Assuming the URLs are in the `publicUrl` property
                const Url2 = response.data.image2.publicUrl;

                if (this.isValidImageUrl(Url1)) {
                    this.imgDocuments.push({ imgUrl: Url1 });
                }
                else if(this.isValidFileUrl(Url1)){
                    const filename = this.getFilenameFromUrl(Url1)
                    this.fileDocuments.push({filename: filename, fileurl: Url1})
                }
                if (this.isValidImageUrl(Url2)) {
                    this.imgDocuments.push({ imgUrl: Url2 });
                }
                else if(this.isValidFileUrl(Url2)){
                    const filename = this.getFilenameFromUrl(Url2)
                    this.fileDocuments.push({ filename: filename, fileurl: Url1})
                }
            }
            catch(err){
                console.log("error retrieving image", err)
            }
        },
        isValidImageUrl(url) {
            // Check if the URL ends with an image file extension
            const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            return validImageExtensions.some(ext => url.toLowerCase().endsWith(ext));
        },
        isValidFileUrl(url) {
            // Check if the URL ends with an image file extension
            const validDocumentExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
            return validDocumentExtensions.some(ext => url.toLowerCase().endsWith(ext));
        },
        getFilenameFromUrl(url) {
            return url.substring(url.lastIndexOf('/') + 1);
        },
    },
    props: {
        requestDetail: {
        type: Object,
        default: () => ({
            shelterid: '',
            sheltername: '',
            email: '',
            documents: [],
            status: 'test'
        })
        }
    },
    watch: {
    requestDetail: {
        handler(newValue) {
            // Extracting the data from Proxy (if needed)
            if (newValue && newValue.length > 0) {
                let shelterDetails = newValue[0]; // Assuming you're dealing with a single object

                // Assign the values to the requestDetail prop if required
                this.requestDetail.shelterid = shelterDetails.id;
                this.requestDetail.sheltername = shelterDetails.sheltername;
                this.requestDetail.email = shelterDetails.email;
                this.requestDetail.documents = shelterDetails.documents;
                this.requestDetail.status = shelterDetails.status;
                
                this.initializeDocuments();
                this.retrieveFiles()

                console.log(this.requestDetail.status);
            }
        },
        immediate: true // Log immediately when the prop is passed
    }
    }
}
</script>