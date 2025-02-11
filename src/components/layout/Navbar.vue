<template>
  <div class="card navbar">
    <div class="flex items-center justify-between w-full px-8">
      <!-- Logo con espaciado -->
      <div class="flex items-center logo-container">
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
          <path d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z" fill="var(--p-primary-color)"/>
        </svg>
      </div>

      <!-- Menú central con espaciado -->
      <Menubar :model="startitems" class="flex-1 justify-center mx-8 border-none shadow-none"></Menubar>

      <!-- Menú derecho con avatar -->
      <div class="flex items-center gap-6">
        <Menubar :model="enditems" class="border-none shadow-none"></Menubar>
        <Menu ref="menu" :model="userMenu" popup />
        <button @click="toggleMenu" class="flex items-center gap-2 bg-transparent hover:bg-gray-200 rounded-full p-2 transition duration-200">
          <Avatar :image="avatarUrl" shape="circle" class="hover:bg-gray-200" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';

const props = defineProps({
  isDarkMode: Boolean
});

const emit = defineEmits(["toggle-dark-mode"]);

const avatarUrl = ref("https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png");
const menu = ref(null);

const startitems = ref([
  { label: 'Inicio', icon: 'pi pi-home' },
  { label: 'Productos', icon: 'pi pi-shopping-cart' },
  { label: 'Documentación', icon: 'pi pi-book' },
]);

const enditems = ref([
  { icon: 'pi pi-search' },
  { icon: computed(() => props.isDarkMode ? 'pi pi-sun' : 'pi pi-moon'), command: () => emit("toggle-dark-mode") },
  { label: 'Iniciar Sesión', icon: 'pi pi-sign-in' }
]);

const userMenu = ref([
  { label: 'Mi Perfil', icon: 'pi pi-user', command: () => console.log('Ir al perfil') },
  { label: 'Historial de Compras', icon: 'pi pi-shopping-cart', command: () => console.log('Ver historial') },
  { label: 'Configuración', icon: 'pi pi-cog', command: () => console.log('Abrir configuración') },
  { separator: true },
  { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => console.log('Cerrar sesión') }
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>

<style scoped>
.navbar {
  font-family: 'Public Sans', ui-sans-serif, system-ui, sans-serif;
  font-size: 14px;
  padding: 10px 0;
}

.logo-container {
  padding-right: 15rem; 
}

.flex-1 {
  flex: 1;
}

.px-8 {
    padding-left: 25rem !important;
    padding-right: 5rem !important;
}

.mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}

.gap-6 {
  gap: 1.5rem;
}

.p-menubar {
  background: transparent;
  border: none;
  box-shadow: none;
}
</style>
