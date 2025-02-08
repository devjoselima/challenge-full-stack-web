<template>
  <v-container class="fill-height">
    <v-card class="pa-5 mx-auto" width="500px">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm" class="d-flex flex-column ga-3">
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
          <v-btn type="submit" color="primary" block>Entrar</v-btn>
          <div class="text-center">
            <span>Ainda não tem uma conta? </span>
            <span 
              class="text-primary text-decoration-underline cursor-pointer hover:text-blue-darken-2" 
              @click="$router.push('/register')"
            >
              Crie uma agora!
            </span>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useLoginForm } from '@/composables/use-login-form';
  import { useTogglePasswordVisibility } from '@/composables/use-toggle-password';

  const { submitForm, errors, email, password } = useLoginForm();
  const { isPasswordVisible, togglePasswordVisibility} = useTogglePasswordVisibility()
</script>