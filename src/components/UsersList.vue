<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import Checkbox from 'primevue/checkbox';

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

const filters = ref({
  global: '',
  Nombre: '',
  Apellidos: '',
  Email: '',
  status: [] as string[],
  verified: null
});

const loading = ref(true);

watch(() => props.users, (newUsers) => {
  if (newUsers.length) {
    loading.value = false;
  }
}, { immediate: true });

const filteredUsers = computed(() => {
  return (props.users as { Nombre: string; Apellidos: string; Email: string; status: string; verified: boolean }[]).filter((user) => {
    const matchesGlobal = filters.value.global
      ? [user.Nombre, user.Apellidos, user.Email].some(field => field.toLowerCase().includes(filters.value.global.toLowerCase()))
      : true;

    const matchesNombre = filters.value.Nombre
      ? user.Nombre.toLowerCase().startsWith(filters.value.Nombre.toLowerCase())
      : true;

    const matchesApellidos = filters.value.Apellidos
      ? user.Apellidos.toLowerCase().startsWith(filters.value.Apellidos.toLowerCase())
      : true;

    const matchesEmail = filters.value.Email
      ? user.Email.startsWith(filters.value.Email)
      : true;

    const matchesStatus = filters.value.status.length > 0
      ? filters.value.status.includes(user.status)
      : true;

    const matchesVerified = filters.value.verified !== null
      ? user.verified === filters.value.verified
      : true;

    return matchesGlobal && matchesNombre && matchesApellidos && matchesEmail && matchesStatus && matchesVerified;
  });
});

const getSeverity = (status: string) => {
  switch (status) {
    case 'unqualified':
      return 'danger';
    case 'qualified':
      return 'success';
    case 'new':
      return 'info';
    case 'negotiation':
      return 'warn';
    case 'renewal':
      return 'secondary';
  }
};
</script>

<template>
  <div class="container">
    <div class="card shadow-lg p-4 rounded-lg bg-white">
      <DataTable 
        :value="filteredUsers" 
        paginator 
        :rows="10" 
        dataKey="id" 
        :loading="loading" 
        class="p-datatable-gridlines responsive-table">
        <template #header>
          <div class="p-datatable-header" data-pc-section="header">
            <div class="flex justify-end">
              <div class="relative p-iconfield">
                <span class="p-inputicon">
                  <i class="pi pi-search"></i>
                </span>
                <input 
                  type="text" 
                  class="p-inputtext p-component pl-8" 
                  placeholder="Keyword Search" 
                  v-model="filters.global"
                />
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="text-center text-gray-500">No se encontraron usuarios.</div>
        </template>
        <template #loading>
          <div class="text-center text-blue-500 font-bold">Cargando datos de usuarios...</div>
        </template>

        <!-- Columna Nombre -->
        <Column field="Nombre" header="Nombre" style="min-width: 8rem">
          <template #body="{ data }">
            <span class="font-semibold">{{ data.Nombre }}</span>
          </template>
          <template #filter="{ filterCallback }">
            <InputText 
              v-model="filters.Nombre" 
              type="text" 
              @input="filterCallback()" 
              placeholder="Buscar por nombre" 
              class="rounded-md px-3 py-2"
            />
          </template>
        </Column>

        <!-- Columna Apellido -->
        <Column field="Apellidos" header="Apellido" style="min-width: 8rem">
          <template #body="{ data }">
            <span>{{ data.Apellidos }}</span>
          </template>
          <template #filter="{ filterCallback }">
            <InputText 
              v-model="filters.Apellidos" 
              type="text" 
              @input="filterCallback()" 
              placeholder="Buscar por apellido" 
              class="rounded-md px-3 py-2"
            />
          </template>
        </Column>

        <!-- Columna Email -->
        <Column field="Email" header="E-Mail" style="min-width: 8rem">
          <template #body="{ data }">
            <span>{{ data.Email }}</span>
          </template>
          <template #filter="{ filterCallback }">
            <InputText 
              v-model="filters.Email" 
              type="text" 
              @input="filterCallback()" 
              placeholder="Buscar por email" 
              class="rounded-md px-3 py-2"
            />
          </template>
        </Column>

        <!-- Columna Estado -->
        <Column field="status" header="Estado" style="min-width: 8rem">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
          </template>
          <template #filter="{ filterCallback }">
            <MultiSelect 
              v-model="filters.status" 
              @change="filterCallback()" 
              :options="['unqualified', 'qualified', 'new', 'negotiation', 'renewal']"
              placeholder="Seleccionar estado" 
              style="min-width: 8rem" 
              class="rounded-md"
            />
          </template>
        </Column>

        <!-- Columna Verificado -->
        <Column field="verified" header="Verificado" dataType="boolean" style="min-width: 6rem">
          <template #body="{ data }">
            <i class="pi" :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>
          </template>
          <template #filter="{ filterCallback }">
            <Checkbox 
              v-model="filters.verified" 
              :indeterminate="filters.verified === null" 
              binary 
              @change="filterCallback()" 
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  font-family: 'Public Sans', 'Public Sans Fallback: Arial', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  width: 1058px;
  height: 816px;
}

.responsive-table {
  max-width: 100%;
  overflow-x: auto;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.pl-8 {
  padding-left: 2rem;
}

.p-iconfield {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.p-inputicon {
  position: absolute;
  left: 10px;
  color: #ccc;
  pointer-events: none; 
}

.p-inputtext {
  max-width: 300px;
  width: 246.5px;
  height: 33px;
  padding: 7px 10.5px 7px 35px !important;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.p-inputtext:enabled:hover {
  border-color: var(--p-inputtext-hover-border-color);
}

.pi {
  width: 8px;
  height: 8px;
}

.p-datatable-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

@media (max-width: 768px) {
  .responsive-table .p-datatable {
    font-size: 0.875rem;
  }

  .responsive-table .p-datatable-thead > tr > th,
  .responsive-table .p-datatable-tbody > tr > td {
    padding: 0.5rem;
  }
}
</style>