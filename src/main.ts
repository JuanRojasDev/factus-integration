import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Aura from '@primevue/themes/aura';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
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
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('MultiSelect', MultiSelect);
app.component('Tag', Tag);
app.component('Checkbox', Checkbox);
app.component('Dropdown', Dropdown);

app.mount('#app');