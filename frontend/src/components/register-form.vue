<template>
  <v-container class="fill-height">
    <v-card class="pa-5 mx-auto" width="500px">
      <v-card-title class="text-center">Cadastro</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm" class="d-flex flex-column ga-3">
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
            label="Senha"
            v-model="password"
            :error-messages="errors.password"
            :type="isPasswordVisible ? 'text' : 'password'" 
            :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="togglePasswordVisibility"
          />
          <v-btn type="submit" color="primary" block>Cadastrar</v-btn>
          <div class="text-center">
            <span>Ja possui uma conta? </span>
             <span 
              class="text-primary text-decoration-underline cursor-pointer hover:text-blue-darken-2" 
              @click="$router.push('/login')"
            >
              Entre agora!
            </span>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useRegisterForm } from '@/composables/use-register-form';
  import { useTogglePasswordVisibility } from '@/composables/use-toggle-password';
  const { submitForm, errors, name, email, password } = useRegisterForm();

  const { isPasswordVisible, togglePasswordVisibility} = useTogglePasswordVisibility()
</script>
