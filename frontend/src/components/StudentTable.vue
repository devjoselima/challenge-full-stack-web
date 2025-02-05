<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="students"
      :loading="loading"
      density="comfortable"
      class="elevation-2"
      :items-per-page="itemsPerPage"
      :pagination="pagination"
      hide-default-footer
    >
      <template v-slot:[`item.cpf`]="{ item }">
        {{ formatCpf(item.cpf) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" color="primary" @click="handleEditStudent(item)">
          mdi-pencil
        </v-icon>

        <v-icon size="small" color="red" @click="handleDeleteStudent(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-pagination
      v-model="pagination.page"
      :length="totalPages"
      @input="fetchStudents"
      style="width: 100%;"
      class="mt-3 d-flex justify-end"
      size="small"
    />
  </v-container>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import { paginateStudents } from "@/api/paginate-students.ts";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import { formatCpf } from "@/utils/format-cpf";

  const students = ref([]);
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    itemsPerPage: 4,
  });
  const totalPages = ref(0);

  const headers = ref([
    { title: "Registro Acadêmico", key: "ra" },
    { title: "Nome", key: "name" },
    { title: "CPF", key: "cpf" },
    { title: "Ações", key: "actions", sortable: false },
  ]);

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

  const handleEditStudent = (student) => {
    console.log("Editar aluno:", student);
  };

  const handleDeleteStudent = (student) => {
    console.log("Excluir aluno:", student);
  };

  onMounted(fetchStudents);
</script>

<style>
  .v-pagination__list {
    justify-content: flex-end;
  }
</style>

