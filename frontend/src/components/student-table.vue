<template>
  <v-container>
    <v-data-table
      :headers="studentTableHeaders"
      :items="students"
      :loading="loading"
      density="comfortable"
      class="elevation-2"
      :items-per-page="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:[`item.cpf`]="{ item }">
        {{ formatCpf(item.cpf) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <TableActions :student="item" @refresh="fetchStudents" />
      </template>

    </v-data-table>

    <v-pagination
      v-model="pagination.page"
      :length="totalPages"
      @input="fetchStudents"
      class="mt-3 d-flex justify-end"
      size="small"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import TableActions from "@/components/table-actions.vue";

import { formatCpf } from "@/utils/format-cpf";
import { studentTableHeaders } from "@/utils/student-table-headers";

import { paginateStudents } from "@/api/paginate-students.ts";


const students = ref([]);
const loading = ref(false);
const pagination = ref({
  page: 1,
  itemsPerPage: 4,
});
const totalPages = ref(0);

const fetchStudents = async () => {
  try {
    loading.value = true;
    const { students: response, total } = await paginateStudents({
      page: pagination.value.page,
      itemsPerPage: pagination.value.itemsPerPage,
    });

    students.value = response;
    totalPages.value = Math.ceil(total / pagination.value.itemsPerPage);
  } catch (error) {
    toast.error("Erro ao buscar alunos");
  } finally {
    loading.value = false;
  }
};

watch(() => pagination.value.page, fetchStudents);
onMounted(fetchStudents);
</script>
