<template>
  <Header />
  <StudentToolbar v-model:search="search"/>
  <StudentTable :search="search" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Header from '@/components/header.vue';
  import StudentToolbar from '@/components/student-toolbar.vue';
  import StudentTable from '@/components/student-table.vue';

  const search = ref('');
</script>
