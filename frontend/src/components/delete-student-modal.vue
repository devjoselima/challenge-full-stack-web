<template>
  <v-dialog :model-value="isOpen" max-width="400" @update:model-value="handleCloseModal">
    <v-card>
      <v-card-title class="text-h6"> Confirmar exclusão </v-card-title>
      <v-card-text>
        Tem certeza de que deseja excluir <strong>{{ student?.name }}</strong>?
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="grey" variant="text" @click="handleCloseModal">Cancelar</v-btn>
        <v-btn color="red" variant="flat" @click="handleDelete">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  isOpen: Boolean,
  student: Object,
});

const emit = defineEmits(["update:isOpen", "delete"]);

const handleCloseModal = () => {
  emit("update:isOpen", false);
};

const handleDelete = () => {
  emit("delete");
  handleCloseModal();
};
</script>
