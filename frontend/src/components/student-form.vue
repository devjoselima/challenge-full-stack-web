<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-4" width="600px">
      <v-card-title>{{ isEdit ? 'Editar Aluno' : 'Cadastrar Aluno' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm" class="d-flex flex-column ga-3">
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
            @input="cpf = cpfMask($event.target.value)"
            :error-messages="errors.cpf"
            :disabled="isEdit"
          />
          <div class="d-flex">
            <v-btn color="primary" type="submit" :disabled="!isAnyFieldDirty">Salvar</v-btn>
            <v-btn variant="text" @click="handleCancel">Cancelar</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useStudentForm } from '@/composables/useStudentForm';
  import { useToastStore } from '@/store/toastStore';
  import { cpfMask } from '@/utils/cpf-mask';
  import { useRouter } from 'vue-router';

  const { isEdit, ra, name, email, cpf, errors, submitForm, isAnyFieldDirty } = useStudentForm(); 
  const router = useRouter();
  const toastStore = useToastStore();

  const handleCancel = () => {
    router.push('/');
    toastStore.clearToastMessage()
  };
</script>
