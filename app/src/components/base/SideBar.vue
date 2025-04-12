<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Avatar from "@/components/user/Avatar.vue";
import { useAuth } from "@/services/auth.service";
import { useTranslation } from "@/services/translation.service";
import { useUserStore } from "@/stores/User";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
} from "lucide-vue-next";
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue-sonner";

const { t } = useTranslation();
const auth = useAuth();
const userStore = useUserStore();
const router = useRouter();
const isOpen = ref(false);
const onLougout = () => {
  auth.logout();
  toast.success(t("Logout_Success"));
  router.push({
    name: "Login",
  });
};

watch(
  router.currentRoute,
  () => {
    isOpen.value = false;
  },
  { immediate: true }
);
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu class="size-7" />
      </Button>
    </SheetTrigger>
    <SheetContent
      class="px-4 py-4 box-border flex flex-col justify-between items-start"
    >
      <div class="w-full">
        <SheetHeader>
          <SheetTitle>
            <div class="flex flex-row items-center justify-start gap-2">
              <Button variant="ghost" size="icon" class="rounded-full">
                <Avatar class="size-9" />
              </Button>
              <span class="text-lg font-bold">{{ t("Menu") }}</span>
            </div>
          </SheetTitle>
          <SheetDescription> {{ t("Menu_Description") }} </SheetDescription>
        </SheetHeader>
        <div class="w-full flex flex-col items-center justify-start gap-2 mt-2">
          <RouterLink
            :to="{ name: 'Dashboard' }"
            exactActiveClass="group active"
            class="w-full"
          >
            <Button
              class="flex flex-row items-center justify-start w-full px-2 py-1 h-9 bg-secondary-foreground group-[.active]:bg-primary"
            >
              <LayoutDashboard class="size-5" />
              <span class="w-5/6 text-center"> {{ t("Home") }} </span>
            </Button>
          </RouterLink>
          <RouterLink
            :to="{ name: 'Chat' }"
            exactActiveClass="group active"
            class="w-full"
          >
            <Button
              class="flex flex-row items-center justify-start w-full px-2 py-1 h-9 bg-secondary-foreground group-[.active]:bg-primary"
            >
              <MessageSquare class="size-5" />
              <span class="w-5/6 text-center"> {{ t("Chat") }} </span>
            </Button>
          </RouterLink>
          <div
            v-if="userStore.user.role == 'ADMIN'"
            class="w-full flex flex-col items-center justify-start gap-2 mt-2"
          >
            <Separator :label="t('Administration')" class="my-2 font-bold" />
            <RouterLink
              :to="{ name: 'Users_Management' }"
              exactActiveClass="group active"
              class="w-full"
            >
              <Button
                class="flex flex-row items-center justify-start w-full px-2 py-1 h-9 bg-secondary-foreground group-[.active]:bg-primary"
              >
                <Users class="size-5" />
                <span class="w-5/6 text-center">
                  {{ t("Users_Management") }}
                </span>
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
      <SheetFooter class="w-full gap-2">
        <RouterLink
          :to="{ name: 'Settings' }"
          exactActiveClass="group active"
          class="w-full"
        >
          <Button
            class="flex flex-row items-center justify-start w-full px-2 py-1 h-9 bg-secondary-foreground group-[.active]:bg-primary"
          >
            <Settings class="size-5" />
            <span class="w-5/6 text-center"> {{ t("Settings") }} </span>
          </Button>
        </RouterLink>
        <Button
          @click="onLougout"
          class="flex flex-row items-center justify-start w-full px-2 py-1 h-9"
          variant="destructive"
        >
          <LogOut />
          <span class="w-5/6 text-center"> {{ t("Logout") }} </span>
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
