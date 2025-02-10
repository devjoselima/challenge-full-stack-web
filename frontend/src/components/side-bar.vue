<template>
  <v-navigation-drawer flat>
    <v-list>
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/grupo-a-logo.png"
      />
    <v-list-item prepend-icon="mdi-account" @click="handleRedirect">Alunos</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { useToastStore } from '@/store/toastStore';

  const router = useRouter();
  const toastStore = useToastStore();

  const handleRedirect = () => {
    router.push('/');
    toastStore.clearToastMessage()
  };
</script>
