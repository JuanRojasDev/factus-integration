<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import FileUpload from 'primevue/fileupload';
import { register } from '../../services/authService';

const emits = defineEmits(['close']);

const username = ref('');
const password = ref('');
const email = ref('');
const nombre = ref('');
const apellidos = ref('');
const avatar = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const currentStep = ref(1);

const predefinedAvatars = [
  'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
  'https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png',
  'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png',
  'https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png',
  'https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png',
  'https://primefaces.org/cdn/primevue/images/avatar/bernardodominic.png'
];

const selectedAvatar = ref(predefinedAvatars[0]);

const handleRegister = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await register(username.value, password.value, email.value, nombre.value, apellidos.value, avatar.value);
    successMessage.value = '¡Registro exitoso!';
  } catch (error) {
    errorMessage.value = 'Error en el registro. Verifica tus datos.';
  }
};

const handleAvatarUpload = (event: any) => {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target) {
      avatar.value = e.target.result as string;
      selectedAvatar.value = avatar.value;
    }
  };
  reader.readAsDataURL(file);
};

const selectAvatar = (predefinedAvatar: string) => {
  avatar.value = predefinedAvatar;
  selectedAvatar.value = predefinedAvatar;
};

const nextStep = () => {
  currentStep.value++;
};

const previousStep = () => {
  currentStep.value--;
};
</script>

<template>
  <div class="card flex flex-column gap-3 register-container">
    <h2>Registrarse</h2>
    <div class="flex flex-wrap gap-4 justify-center">
      <form @submit.prevent="currentStep === 1 ? nextStep() : handleRegister()" class="form-container">
        <div v-if="currentStep === 1" class="step-1">
          <div class="flex flex-column gap-2">
            <label for="username">Username</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText id="username" v-model="username" placeholder="Username" />
            </InputGroup>
          </div>

          <div class="flex flex-column gap-2">
            <label for="password">Password</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <InputText id="password" v-model="password" type="password" placeholder="Password" />
            </InputGroup>
          </div>

          <div class="flex flex-column gap-2">
            <label for="email">Email</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-envelope"></i>
              </InputGroupAddon>
              <InputText id="email" v-model="email" placeholder="Email" />
            </InputGroup>
          </div>

          <div class="flex flex-column gap-2">
            <label for="nombre">Nombre</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText id="nombre" v-model="nombre" placeholder="Nombre" />
            </InputGroup>
          </div>

          <div class="flex flex-column gap-2">
            <label for="apellidos">Apellidos</label>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText id="apellidos" v-model="apellidos" placeholder="Apellidos" />
            </InputGroup>
          </div>

          <Button type="submit" label="Siguiente" icon="pi pi-arrow-right" class="p-button-success mt-4" />
        </div>

        <div v-if="currentStep === 2" class="step-2">
          <div class="avatar-selection flex flex-column items-center gap-2">
            <h2>Elige un Avatar</h2>
            <div class="avatar-main">
              <Avatar :image="selectedAvatar" shape="circle" size="xlarge" />
            </div>
            <div class="flex gap-2 mt-2 avatar-list justify-center">
              <div v-for="predefinedAvatar in predefinedAvatars" :key="predefinedAvatar" class="avatar-option" :class="{ selected: predefinedAvatar === selectedAvatar }" @click="selectAvatar(predefinedAvatar)">
                <Avatar :image="predefinedAvatar" shape="circle" size="large" class="cursor-pointer" />
              </div>
            </div>
            <FileUpload mode="basic" name="avatar" accept="image/*" customUpload :auto="true" @upload="handleAvatarUpload" />
          </div>

          <div class="flex justify-between mt-4">
            <Button type="button" label="Anterior" icon="pi pi-arrow-left" class="p-button-secondary" @click="previousStep" />
            <Button type="submit" label="Registrarse" icon="pi pi-check" class="p-button-success" />
          </div>
        </div>
      </form>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <button @click="$emit('close')" class="toggle-mode-button">
      ¿Ya tienes una cuenta? Inicia sesión aquí
    </button>
  </div>
</template>

<style scoped>
.register-container {
  font-family: 'Public Sans', 'Public Sans Fallback: Arial', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-container {
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.toggle-mode-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
}

.toggle-mode-button:hover {
  text-decoration: underline;
}

.avatar-option {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 2px;
}

.avatar-option.selected {
  border-color: #007bff;
}

.avatar-option:hover {
  border-color: #007bff;
}

.avatar-selection {
  max-width: 200px;
  text-align: center;
  margin: auto;
}

.avatar-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.avatar-list {
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.step-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>