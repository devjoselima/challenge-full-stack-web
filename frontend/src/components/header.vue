<template>
  <SideBar v-model="isDrawerOpen" />

  <v-app-bar flat class="border-b">
    <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
    <v-app-bar-title>Consulta de alunos</v-app-bar-title>
    <v-tooltip text="Sair" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" @click="handleLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import SideBar from '@/components/side-bar.vue'

const isDrawerOpen = ref(true);
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
