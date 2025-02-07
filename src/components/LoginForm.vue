<script setup lang="ts">
import { ref } from 'vue';
import InputGroup from 'primevue/inputgroup'; // Importar InputGroup
import InputGroupAddon from 'primevue/inputgroupaddon'; // Importar InputGroupAddon
import InputText from 'primevue/inputtext'; // Importar InputText
import InputNumber from 'primevue/inputnumber'; // Importar InputNumber
import Button from 'primevue/button'; // Importar el botón de PrimeVue

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const price = ref(0);
const website = ref('');
const successMessage = ref('');
const isLoginMode = ref(true);

const handleLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // Aquí iría tu lógica para login
    successMessage.value = '¡Inicio de sesión exitoso!';
  } catch (error) {
    errorMessage.value = 'Error en la autenticación. Verifica tus credenciales.';
  }
};

const handleRegister = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // Aquí iría tu lógica para registro
    successMessage.value = '¡Registro exitoso!';
  } catch (error) {
    errorMessage.value = 'Error en el registro. Verifica tus datos.';
  }
};
</script>

<template>
  <div class="card flex flex-column gap-3 login-container">
    <h2>{{ isLoginMode ? 'Iniciar Sesión' : 'Registrarse' }}</h2>
    <form @submit.prevent="isLoginMode ? handleLogin : handleRegister">
      <!-- Campo de Usuario -->
      <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText id="username" v-model="username" placeholder="Username" />
        </InputGroup>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <!-- Campo de Contraseña -->
      <div class="flex flex-column gap-2">
        <label for="password">Password</label>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <InputText id="password" v-model="password" type="password" placeholder="Password" />
        </InputGroup>
        <small id="password-help">Enter your password.</small>
      </div>

      <!-- Campo de Precio (solo en modo registro) -->
      <div v-if="!isLoginMode" class="flex flex-column gap-2">
        <label for="price">Price</label>
        <InputGroup>
          <InputGroupAddon>$</InputGroupAddon>
          <InputNumber id="price" v-model="price" mode="decimal" :minFractionDigits="2" />
          <InputGroupAddon>.00</InputGroupAddon>
        </InputGroup>
      </div>

      <!-- Campo de Website (solo en modo registro) -->
      <div v-if="!isLoginMode" class="flex flex-column gap-2">
        <label for="website">Website</label>
        <InputGroup>
          <InputGroupAddon>www</InputGroupAddon>
          <InputText id="website" v-model="website" placeholder="Website" />
        </InputGroup>
      </div>

      <!-- Botón de Enviar -->
      <Button type="submit" :label="isLoginMode ? 'Iniciar Sesión' : 'Registrarse'" icon="pi pi-check" class="p-button-success" />
    </form>

    <!-- Mensajes de error y éxito -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Cambiar entre Login y Registro -->
    <button @click="isLoginMode = !isLoginMode" class="toggle-mode-button">
      {{ isLoginMode ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
    </button>
  </div>
</template>

<style scoped>
.login-container {
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