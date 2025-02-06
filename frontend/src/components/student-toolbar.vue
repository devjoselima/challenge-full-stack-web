<template>
  <v-container class="d-flex align-center justify-space-between ga-4">
    <v-text-field
      :model-value="search"
      label="Buscar por RA"
      variant="outlined"
      append-inner-icon="mdi-magnify"
      clearable
      @input="$emit('update:search', $event.target.value)"
      @click:append-inner="$emit('update:search', search)"
      @keyup.enter="$emit('update:search', search)"
      style="max-width: 400px;"
    />
    <v-btn color="primary" @click="$router.push('/student')">Cadastrar aluno</v-btn>
  </v-container>
</template>

<script setup>
  defineProps(["search"]);
  defineEmits(["update:search"]);
</script>
