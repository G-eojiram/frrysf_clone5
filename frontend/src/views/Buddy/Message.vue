
 <template>
  <div class="flex h-screen bg-white">
    <!-- Left Sidebar -->
    <div class="w-64 border-r">
      <div class="p-4">
        <div class="flex space-x-[60%]">
          <h1 class="text-xl font-bold mb-4">CHAT</h1>
          <button class="pb-6 opacity-50" @click="toggleNewMessage">
            <svg fill="none" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg"><g stroke="#141b34" stroke-width="1.5"><path d="m12 8v8m4-4h-8" stroke-linecap="round" stroke-linejoin="round"/><path d="m2.5 12c0-4.47834 0-6.71751 1.39124-8.10876 1.39125-1.39124 3.63042-1.39124 8.10876-1.39124 4.4783 0 6.7175 0 8.1088 1.39124 1.3912 1.39125 1.3912 3.63042 1.3912 8.10876 0 4.4783 0 6.7175-1.3912 8.1088-1.3913 1.3912-3.6305 1.3912-8.1088 1.3912-4.47834 0-6.71751 0-8.10876-1.3912-1.39124-1.3913-1.39124-3.6305-1.39124-8.1088z"/></g></svg>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </button>
        </div>
        <div class="relative">
          <input type="text" placeholder="Search user or chat" class="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2.5 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div v-if="showNewMessage" class="border-b p-4 bg-gray-200 mx-2">
        <div class="flex space-x-14">
        <p class="text-lg font-semibold">New message</p>
        <button @click="sendMessage" class="p-2 rounded-full text-black">
          <!-- Changed from "Send" to "X" icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
      <div class="overflow-y-auto h-[calc(100vh-100px)]">
        <div class="p-4 space-y-4">
          <div v-for="name in ['Nina Sullivan', 'Gillian Barnett', 'Andrea Mendoza', 'Vincent Oliver', 'Steven Morris', 'Darren Jensen', 'Herbert Hunter']" :key="name" class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
              {{ name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <p class="text-sm font-medium">{{ name }}</p>
              <p class="text-xs text-gray-500">Last message...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col">
      <div v-if="showNewMessage" class="border-b p-4">
        <input type="text" v-model="newMessage" placeholder="Type your message..." class="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button @click="sendMessage" class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          <!-- Changed from "Send" to "X" icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="border-b p-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            PT
          </div>
          <h2 class="text-lg font-semibold">Product Team</h2>
        </div>
        <div class="flex space-x-2">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="flex items-start space-x-2">
          <div class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div>
            <p class="bg-blue-100 rounded-lg p-2 max-w-md">I was just curious where could I find the pricing of H&M Female Dresses?</p>
            <p class="text-xs text-gray-500 mt-1">8:39 PM</p>
          </div>
        </div>
        <div class="flex items-start space-x-2 justify-end">
          <div class="text-right">
            <p class="bg-gray-100 rounded-lg p-2 max-w-md">Here is the link:</p>
            <p class="text-xs text-gray-500 mt-1">8:40 PM</p>
          </div>
          <div class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        </div>
      </div>
      <div class="border-t p-4">
        <div class="flex items-center space-x-2">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input type="text" placeholder="Type a message here..." class="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <!-- <div class="w-64 border-l p-4">
      <h3 class="font-semibold mb-4">Shared Files (15)</h3>
      <div class="grid grid-cols-3 gap-2">
        <div v-for="i in 9" :key="i" class="bg-gray-200 w-16 h-16 rounded-lg"></div>
      </div>
    </div> -->
  </div>
</template>


<script>
export default {
  name: "messageUser", 
  data() {
    return {
      showNewMessage: false,
      newMessage: ''
    };
  },
  methods: {
    toggleNewMessage() {
      this.showNewMessage = !this.showNewMessage;
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        console.log("Message sent:", this.newMessage);
        this.newMessage = ''; // Clear the input after sending
        this.showNewMessage = false; // Optionally hide the input after sending
      }
    }
  }
};
</script>

<style scoped>

</style>
