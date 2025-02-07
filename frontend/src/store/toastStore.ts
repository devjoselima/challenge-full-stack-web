import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const toastMessage = ref("");

  function setToastMessage(message: string) {
    toastMessage.value = message;
  }

  function clearToastMessage() {
    toastMessage.value = "";
  }

  return { toastMessage, setToastMessage, clearToastMessage };
});
