<template>
  <v-container class="d-flex align-center justify-space-between ga-4">
    <v-text-field
      v-model="search"
      label="Buscar por RA"
      variant="outlined"
      append-inner-icon="mdi-magnify"
      clearable
      @click:append-inner="onSearch"
      @keyup.enter="onSearch"
      style="max-width: 400px;"
    />
    <v-btn color="primary" @click="$router.push('/student')">Cadastrar aluno</v-btn>
  </v-container>

</template>
 
<script setup>
import { ref } from 'vue';
const search = ref('');

const onSearch = () => {
  console.log(search.value);
};
</script>
