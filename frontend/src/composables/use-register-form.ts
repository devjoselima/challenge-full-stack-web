import { useField, useForm } from "vee-validate";
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useAuthStore } from '@/store/auth'
import { useRouter } from "vue-router";
import { useToastStore } from "@/store/toastStore";

export const useRegisterForm = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const toastStore = useToastStore();

  const registerSchema = toTypedSchema(
    z.object({
      name: z.string({ required_error: 'O nome é obrigatório' }).min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
      email: z.string({ required_error: 'O e-mail é obrigatório' }).email('E-mail inválido'),
      password: z.string({ required_error: 'A senha é obrigatória' }).min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    })
  )

  const { handleSubmit, errors } = useForm({
    validationSchema: registerSchema
  })

  const { value: name } = useField("name");
  const { value: email } = useField("email");
  const { value: password } = useField("password");

  const submitForm = handleSubmit(async (values) => {
    await authStore.register(values.name, values.email, values.password) 
    toastStore.clearToastMessage();
    router.push('/')   
  })

  return { submitForm, errors, name, email, password }
}