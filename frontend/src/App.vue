<template>
  <v-app>
    <Header v-if="!isVisible" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import Header from '@/components/header.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  const route = useRoute()
  const isVisible = computed(() => ['/register', '/login'].includes(route.path))
</script>
