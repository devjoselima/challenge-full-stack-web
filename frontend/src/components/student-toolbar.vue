<template>
  <v-container class="d-flex align-center justify-space-between ga-4">
    <v-text-field
      :model-value="search"
      label="Buscar por RA"
      variant="outlined"
      append-inner-icon="mdi-magnify"
      @input="$emit('update:search', $event.target.value)"
      @click:append-inner="$emit('update:search', search)"
      @keyup.enter="$emit('update:search', search)"
      style="max-width: 400px;"
    />
    <v-btn color="primary" @click="handleRedirectStudent">Cadastrar aluno</v-btn>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useStudentStore } from '@/store/studentStore';
  
  const router = useRouter()
  const studentStore = useStudentStore();
  
  defineProps(["search"]);
  defineEmits(["update:search"]);

  const handleRedirectStudent = () => {
    studentStore.clearStudent()
    router.push("/student");
  };
</script>
