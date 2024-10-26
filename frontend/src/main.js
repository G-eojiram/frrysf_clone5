import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router
import globalMixin from '@/router/globalMixin'; // Import your global mixin
import './assets/css/style.css'; // Import your CSS styles

// Create the Vue application instance
const app = createApp(App);

// Apply the global mixin
app.mixin(globalMixin);

// Use the router in your app
app.use(router);

// Mount the app to the DOM element with id 'app'
app.mount('#app');
