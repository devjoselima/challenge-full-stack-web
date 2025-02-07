import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue3-toastify";
import { z } from "zod";

import { createStudent } from "@/api/create-student";
import { updateStudent } from "@/api/update-student";

import { useStudentStore } from "@/store/studentStore";
import { useToastStore } from "@/store/toastStore";
import { AxiosError } from "axios";

export const useStudentForm = () => {
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
        .string({ required_error: "O CPF é obrigatório" }).min(11, "CPF inválido"),
    })
  );

  const { handleSubmit, errors, meta } = useForm({
    validationSchema: studentSchema,
    initialValues: {
      ra: studentStore.student?.ra ?? undefined,
      name: studentStore.student?.name ?? undefined,
      email: studentStore.student?.email ?? undefined,
      cpf: studentStore.student?.cpf ?? undefined,
    },
  });

  const { value: ra } = useField("ra");
  const { value: name } = useField("name");
  const { value: email } = useField("email");
  const { value: cpf } = useField("cpf");
  
  const isAnyFieldDirty = computed(() => meta.value.dirty)

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
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data.message
        if(errorMessage.includes("CPF")) {
          toast.error("CPF já cadastrado");
          return;
        }     
        if(errorMessage.includes("E-mail")) {
          toast.error("E-mail já cadastrado");
          return;
        }     
        if(errorMessage.includes("RA")) {
          toast.error("Registro Acadêmico já cadastrado");
          return;
        }
        toast.error("Erro ao salvar aluno");
      }
    }
  });

  return { isEdit, ra, name, email, cpf, errors, submitForm, isAnyFieldDirty };
}
