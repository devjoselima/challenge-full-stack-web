import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue3-toastify";
import { z } from "zod";

import { createStudent } from "@/api/create-student";
import { updateStudent } from "@/api/update-student";

import { useStudentStore } from "@/store/studentStore";
import { useToastStore } from "@/store/toastStore";

export function useStudentForm() {
  const router = useRouter();
  const studentStore = useStudentStore();
  const toastStore = useToastStore();
  const isEdit = ref(!!studentStore.student);

  const studentSchema = toTypedSchema(
  z.object({
    ra: z.string({ required_error: "O Registro Acadêmico é obrigatório" }),
    name: z.string({ required_error: "O nome do aluno é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string({ required_error: "O email é obrigatório" }).email("E-mail inválido"),
    cpf: z
      .string({ required_error: "O CPF é obrigatório" }).min(11, "CPF inválido").max(11, "CPF inválido"),
  })
);

  const { handleSubmit, errors } = useForm({
    validationSchema: studentSchema,
    initialValues: {
      ra: studentStore.student?.ra || "",
      name: studentStore.student?.name || "",
      email: studentStore.student?.email || "",
      cpf: studentStore.student?.cpf || "",
    },
  });

  const { value: ra } = useField("ra");
  const { value: name } = useField("name");
  const { value: email } = useField("email");
  const { value: cpf } = useField("cpf");

  const submitForm = handleSubmit(async (values) => {
    try {
      if (isEdit.value) {
        await updateStudent(values.ra, { name: values.name, email: values.email });
        toastStore.setToastMessage("Aluno atualizado com sucesso!");
      } else {
        await createStudent(values);
        toastStore.setToastMessage("Aluno criado com sucesso!");
      }
      router.push("/");
    } catch (error) {
      toast.error("Erro ao salvar aluno");
    }
  });

  return { isEdit, ra, name, email, cpf, errors, submitForm };
}
