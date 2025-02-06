import type { Student } from "@/@types/student";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStudentStore = defineStore("student", () => {
  const student = ref<Student | null >(null);

  function setStudent(data: any) {
    student.value = data;
  }

  function clearStudent() {
    student.value = null;
  }

  return { student, setStudent, clearStudent };
});
