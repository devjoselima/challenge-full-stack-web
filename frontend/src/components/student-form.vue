<template>
  <v-container class="fill-height d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card class="pa-4" width="600px">
      <v-card-title>{{ isEdit ? 'Editar Aluno' : 'Cadastrar Aluno' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm" :validation-schema="studentSchema" class="d-flex flex-column ga-3">
          <v-text-field
            label="Registro Acadêmico"
            v-model="ra"
            :error-messages="errors.ra"
            :disabled="isEdit"
          />
          <v-text-field
            label="Nome"
            v-model="name"
            :error-messages="errors.name"
          />
          <v-text-field
            label="E-mail"
            v-model="email"
            :error-messages="errors.email"
          />
          <v-text-field
            label="CPF"
            v-model="cpf"
            :error-messages="errors.cpf"
            :disabled="isEdit"
          />
          <div class="d-flex">
            <v-btn color="primary" type="submit">Salvar</v-btn>
            <v-btn variant="text" @click="$router.push('/')">Cancelar</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { z } from "zod";
import { createStudent } from "@/api/create-student";
import { updateStudent } from "@/api/update-student";

const router = useRouter();
const route = useRoute();

const isEdit = ref(!!route.query.ra);

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
    ra: route.query.ra || "",
    name: route.query.name || "",
    email: route.query.email || "",
    cpf: route.query.cpf || "",
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
      toast.success("Aluno atualizado com sucesso!");
    } else {
      await createStudent(values);
      toast.success("Aluno criado com sucesso!");
    }
    router.push("/");
  } catch (error) {
    toast.error("Erro ao salvar aluno");
  }
});
</script>
