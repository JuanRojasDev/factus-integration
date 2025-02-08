<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import LoginForm from './components/LoginForm.vue';
import Navbar from './components/Navbar.vue';

const api = "https://factus-db-factus-db.up.railway.app/API.php";
const data = ref([]);

const getData = async () => {
  try {
    const response = await axios.get(api + "?opc=list");
    data.value = response.data.data;
    console.log(data.value);
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
    <h1>Data from API:</h1>
    <pre>{{ data }}</pre>
  </div>
</template>