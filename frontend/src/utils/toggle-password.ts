import { ref } from "vue";

export function handleTogglePasswordVisibility() {
  const isPasswordVisible = ref(false);

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  return { isPasswordVisible, togglePasswordVisibility };
}
