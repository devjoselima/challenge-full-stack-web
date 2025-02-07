import { useField, useForm } from "vee-validate";
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useAuthStore } from '@/store/auth'
import { useRouter } from "vue-router";
import "vue3-toastify/dist/index.css";

export const useLoginForm = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const loginSchema = toTypedSchema(
    z.object({
      email: z.string({ required_error: 'O e-mail é obrigatório' }).email('E-mail inválido'),
      password: z.string({ required_error: 'A senha é obrigatória' }).min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    })
  )

  const { handleSubmit, errors } = useForm({
    validationSchema: loginSchema
  })

  const { value: email } = useField("email");
  const { value: password } = useField("password");

  const submitForm = handleSubmit(async (values) => {
    await authStore.login(values.email, values.password) 
    router.push('/')   
  })

  return { submitForm, errors, email, password }
}