<template>
  <StudentToolbar v-model:search="search"/>
  <StudentTable :search="search" />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue3-toastify';
  
  import StudentToolbar from '@/components/student-toolbar.vue';
  import StudentTable from '@/components/student-table.vue';

  import { useToastStore } from '@/store/toastStore';

  const search = ref('');
  const toastStore = useToastStore();

  onMounted(() => {
    if (toastStore.toastMessage) {
      toast.success(toastStore.toastMessage)
    }
  })
</script>
