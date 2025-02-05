<template>
  <SideBar v-model="isDrawerOpen" />

  <v-app-bar flat class="border-b">
    <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
    <v-app-bar-title>Consulta de alunos</v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import SideBar from '@/components/SideBar.vue'
  const isDrawerOpen = ref(true)
</script>
