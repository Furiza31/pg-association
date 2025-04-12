<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAPI } from "@/services/API.service"; // Import API service
import { state, useSocket } from "@/services/socket.service";
import { useTranslation } from "@/services/translation.service";
import { useUserStore } from "@/stores/User";
import { SendHorizontal } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";

const { t } = useTranslation();
const userStore = useUserStore();
const socket = useSocket();
const api = useAPI(); // Get API instance for accessing token
const message = ref("");
const rooms = ["general", "support", "random"];
const selectedRoom = ref("general");

onMounted(() => {
  socket.connect();
  joinRoom(selectedRoom.value);
});

onUnmounted(() => {
  socket.disconnect();
});

function joinRoom(roomId: unknown) {
  if (typeof roomId !== "string" || !roomId) return;
  selectedRoom.value = roomId;
  socket.joinRoom(roomId);
}

function sendMessage() {
  if (!message.value.trim()) return;

  socket.sendMessage(message.value, userStore.user.id, api.getToken());

  message.value = "";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
</script>

<template>
  <section class="h-full w-full bg-background p-4 flex flex-col">
    <h1 class="text-2xl font-bold mb-2">{{ t("Chat") }}</h1>

    <div class="mb-4">
      <Select v-model="selectedRoom" @update:modelValue="joinRoom">
        <SelectTrigger class="w-full">
          <SelectValue :placeholder="t('Select_Room')" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="room in rooms" :key="room" :value="room">
            {{ t(room.charAt(0).toUpperCase() + room.slice(1)) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="flex-1 overflow-y-auto mb-4 border rounded-lg p-4 bg-card">
      <div v-if="state.messages[selectedRoom]?.length">
        <div
          v-for="(msg, index) in state.messages[selectedRoom]"
          :key="index"
          class="mb-3"
          :class="
            msg.user?.id === String(userStore.user.id)
              ? 'text-right'
              : 'text-left'
          "
        >
          <div
            class="inline-block max-w-[80%] px-4 py-2 rounded-lg"
            :class="
              msg.user?.id === String(userStore.user.id)
                ? 'bg-primary text-primary-foreground rounded-tr-none'
                : 'bg-muted rounded-tl-none'
            "
          >
            <div class="font-semibold text-sm">
              {{ msg.user?.username || msg.user?.email || "Unknown User" }}
              <span class="text-xs opacity-70 ml-2">{{
                formatDate(msg.timestamp)
              }}</span>
            </div>
            <p class="mt-1 break-words">{{ msg.message }}</p>
          </div>
        </div>
      </div>

      <div
        v-else
        class="h-full flex items-center justify-center text-muted-foreground"
      >
        {{ t("No_Messages") }}
      </div>
    </div>

    <div class="flex gap-2 w-full items-end">
      <Input
        v-model="message"
        class="w-full"
        @keyup.enter="sendMessage"
        id="message"
      />
      <Button @click="sendMessage" :disabled="!message.trim()">
        <SendHorizontal class="h-5 w-5" />
        <span class="sr-only">{{ t("Send") }}</span>
      </Button>
    </div>

    <div class="mt-2 text-xs text-muted-foreground flex items-center">
      <div
        class="w-2 h-2 rounded-full mr-2"
        :class="state.connected ? 'bg-green-500' : 'bg-red-500'"
      ></div>
      {{ state.connected ? t("Connected") : t("Disconnected") }}
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mb-3 {
  animation: fadeIn 0.3s ease-out;
}
</style>
