import { ref } from "vue";

export function useTogglePasswordVisibility() {
  const isPasswordVisible = ref(false);

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  return { isPasswordVisible, togglePasswordVisibility };
}
