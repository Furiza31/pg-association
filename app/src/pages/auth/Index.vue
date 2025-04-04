<script setup lang="ts">
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/services/auth.service";
import { useTranslation } from "@/services/translation.service";
import { LoaderCircle } from "lucide-vue-next";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { t } = useTranslation();
const route = useRoute();
const router = useRouter();
const auth = useAuth();
const isAuthChecking = ref(true);

onBeforeMount(async () => {
  const isAuthenticated = await auth.isAuthenticated();
  if (isAuthenticated) router.push({ name: "Dashboard" });
  isAuthChecking.value = false;
});

const handleTabChange = (value: unknown) => {
  router.push({ name: value as string });
};
</script>

<template>
  <section class="flex flex-col items-center justify-center h-screen w-full">
    <Tabs
      :default-value="route.name?.toString()"
      class="w-1/3 min-w-[350px] max-w-[450px]"
      @update:model-value="handleTabChange"
      v-if="!isAuthChecking"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="Login"> {{ t("Login") }} </TabsTrigger>
        <TabsTrigger value="Register"> {{ t("Register") }} </TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Login />
      </TabsContent>
      <TabsContent value="Register">
        <Register />
      </TabsContent>
    </Tabs>
    <div v-else>
      <LoaderCircle class="size-12 animate-spin" />
    </div>
  </section>
</template>
