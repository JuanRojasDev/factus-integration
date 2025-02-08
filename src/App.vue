<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import LoginForm from './components/LoginForm.vue';
import Navbar from './components/Navbar.vue';
import UsersList from './components/UsersList.vue';

const api = "https://factus-db-factus-db.up.railway.app/API.php";
const users = ref([]);

const getData = async () => {
  try {
    const response = await axios.get(api + "?opc=list");
    users.value = response.data.data;
    console.log(users.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <Navbar />
  <LoginForm />
  <div>
    <UsersList :users="users" />
  </div>
</template>