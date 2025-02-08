import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});

app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Avatar', Avatar);

app.mount('#app');