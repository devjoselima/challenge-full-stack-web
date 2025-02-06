<template>
  <div class="d-flex align-center">
    <v-icon size="small" class="me-2" color="primary" @click="handleRedirectStudent(student)">
      mdi-pencil
    </v-icon>

    <v-icon size="small" color="red" @click="openDeleteModal(student)">
      mdi-delete
    </v-icon>

    <DeleteStudentModal
      :isOpen="deleteModalIsOpen"
      :student="studentToDelete"
      @update:isOpen="deleteModalIsOpen = $event"
      @delete="handleDeleteStudent"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { deleteStudent } from "@/api/delete-student";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import DeleteStudentModal from "@/components/delete-student-modal.vue";

const props = defineProps({
  student: Object,
});

const router = useRouter();
const emit = defineEmits(["refresh"]);

const deleteModalIsOpen = ref(false);
const studentToDelete = ref(null);

const openDeleteModal = (student) => {
  studentToDelete.value = student;
  deleteModalIsOpen.value = true;
};

const handleDeleteStudent = async () => {
  try {
    await deleteStudent({ ra: studentToDelete.value.ra });
    toast.success("Aluno excluído com sucesso!");
    deleteModalIsOpen.value = false;
    emit("refresh");
  } catch (error) {
    toast.error("Erro ao excluir aluno");
  }
};

const handleRedirectStudent = (student) => {
  router.push({
    path: "/student",
    query: {
      ra: student.ra,
      name: student.name,
      email: student.email,
      cpf: student.cpf,
    }
  });
};
</script>
