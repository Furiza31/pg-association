<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/services/translation.service";
import { UserType } from "@/types/UserType";
import { Edit, Trash2 } from "lucide-vue-next";

const { t } = useTranslation();
const props = defineProps<{
  user: UserType;
}>();

const emit = defineEmits<{
  (e: "edit", user: UserType): void;
  (e: "delete", userId: number): void;
}>();

function handleEdit() {
  emit("edit", props.user);
}

function handleDelete() {
  if (props.user.id) {
    emit("delete", props.user.id);
  }
}
</script>

<template>
  <div class="flex space-x-2">
    <Button variant="ghost" size="icon" class="h-8 w-8" @click="handleEdit">
      <Edit class="h-4 w-4" />
      <span class="sr-only">{{ t("Edit_User_Action") }}</span>
    </Button>
    <Button
      variant="ghost"
      size="icon"
      class="h-8 w-8 text-red-600 hover:text-red-900 hover:bg-red-50"
      @click="handleDelete"
    >
      <Trash2 class="h-4 w-4" />
      <span class="sr-only">{{ t("Delete_User_Action") }}</span>
    </Button>
  </div>
</template>
