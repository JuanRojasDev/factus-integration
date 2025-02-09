<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { login } from '../../services/authService'; // Importar la función de login

const emits = defineEmits(['show-register']); // Definir el evento para mostrar el formulario de registro

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await login(username.value, password.value);
    successMessage.value = '¡Inicio de sesión exitoso!';
    // Aquí puedes agregar lógica para manejar el inicio de sesión exitoso
  } catch (error) {
    errorMessage.value = 'Error en la autenticación. Verifica tus credenciales.';
  }
};
</script>

<template>
  <div class="card flex flex-column gap-3 login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="flex flex-column gap-2">
        <label for="username">Nombre</label>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText id="username" v-model="username" placeholder="Nombre" />
        </InputGroup>
      </div>

      <div class="flex flex-column gap-2">
        <label for="password">Contraseña</label>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <InputText id="password" v-model="password" type="password" placeholder="Contraseña" />
        </InputGroup>
      </div>

      <Button type="submit" label="Iniciar Sesión" icon="pi pi-check" class="p-button-success" />
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <button @click="$emit('show-register')" class="toggle-mode-button">
      ¿No tienes cuenta aún? Regístrate aquí
    </button>
  </div>
</template>

<style scoped>
.login-container {
  font-family: 'Public Sans', 'Public Sans Fallback: Arial', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
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
</style>