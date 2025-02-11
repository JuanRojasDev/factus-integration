<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import LoginForm from './components/auth/LoginForm.vue';
import RegisterForm from './components/auth/RegisterForm.vue';
import Navbar from './components/layout/Navbar.vue';
import UsersList from './components/layout/UsersList.vue';

const api = "https://factus-db-factus-db.up.railway.app/API.php";
const users = ref([]);
const showRegisterForm = ref(false);
const isDarkMode = ref(localStorage.getItem("dark-mode") === "true");

const getData = async () => {
  try {
    const response = await axios.get(api + "?opc=list");
    users.value = response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem("dark-mode", isDarkMode.value.toString());
};

onMounted(() => {
  getData();
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark-mode");
  }
});
</script>

<template>
  <div>
    <Navbar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <div v-if="!showRegisterForm">
      <LoginForm @show-register="showRegisterForm = true" />
    </div>
    <div v-else>
      <RegisterForm @close="showRegisterForm = false" />
    </div>
    <UsersList :users="users" />
  </div>
</template>