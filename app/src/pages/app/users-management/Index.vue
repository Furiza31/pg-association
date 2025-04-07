<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAPI } from "@/services/API.service";
import { useTranslation } from "@/services/translation.service";
import { UserType } from "@/types/UserType";
import { Loader } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";
import { columns } from "../../../components/users-management/columns";
import UsersDataTable from "../../../components/users-management/data-table.vue";

const { t } = useTranslation();
const api = useAPI();
const users = ref<UserType[]>([]);
const loading = ref(true);
const dialogOpen = ref(false);
const editingUser = ref<UserType | null>(null);

// Form fields
const username = ref("");
const email = ref("");
const language = ref("en-US");
const role = ref<"ADMIN" | "USER" | null>(null);
const password = ref("");
const confirmPassword = ref("");

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await api.get("/users");
    if (response.status === 200) {
      users.value = response.data.users;
    } else {
      toast.error(response.message || "Failed to fetch users");
    }
  } catch (error) {
    toast.error("An error occurred while fetching users");
  } finally {
    loading.value = false;
  }
};

const openCreateDialog = () => {
  editingUser.value = null;
  username.value = "";
  email.value = "";
  language.value = "en-US";
  role.value = "USER";
  password.value = "";
  confirmPassword.value = "";
  dialogOpen.value = true;
};

const openEditDialog = (user: UserType) => {
  editingUser.value = user;
  username.value = user.username || "";
  email.value = user.email || "";
  language.value = user.language || "en-US";
  role.value = user.role;
  password.value = "";
  confirmPassword.value = "";
  dialogOpen.value = true;
};

const createUser = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await api.post("/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    if (response.status === 201) {
      toast.success("User created successfully");
      dialogOpen.value = false;
      await fetchUsers();
    } else {
      toast.error(response.message || "Failed to create user");
    }
  } catch (error) {
    toast.error("An error occurred while creating user");
  }
};

const updateUser = async () => {
  if (!editingUser.value) return;

  try {
    const userData = {
      id: editingUser.value.id,
      username: username.value,
      email: email.value,
      language: language.value,
      role: role.value,
    };

    const response = await api.put("/user", userData);

    if (response.status === 200) {
      toast.success("User updated successfully");
      dialogOpen.value = false;
      await fetchUsers();
    } else {
      toast.error(response.message || "Failed to update user");
    }
  } catch (error) {
    toast.error("An error occurred while updating user");
  }
};

const deleteUser = async (userId: number) => {
  try {
    const response = await api.delete("/user/" + userId);

    if (response.status === 200) {
      toast.success("User deleted successfully");
      await fetchUsers();
    } else {
      toast.error(response.message || "Failed to delete user");
    }
  } catch (error) {
    toast.error("An error occurred while deleting user check your network");
  }
};

const handleSubmit = () => {
  if (editingUser.value) {
    updateUser();
  } else {
    createUser();
  }
};
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <div class="flex justify-between items-center mb-6">
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button @click="openCreateDialog">{{ t("Add_User") }}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogDescription>
            {{
              editingUser
                ? t("Edit_User_Description")
                : t("Create_User_Description")
            }}
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>{{
              editingUser ? t("Edit_User") : t("Create_User")
            }}</DialogTitle>
          </DialogHeader>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <Label for="username">{{ t("Username") }}</Label>
                <Input id="username" v-model="username" required />
              </div>

              <div class="grid gap-2">
                <Label for="email">{{ t("Email") }}</Label>
                <Input id="email" type="email" v-model="email" required />
              </div>

              <div class="grid gap-2">
                <Label for="language">{{ t("Language") }}</Label>
                <Select v-model="language">
                  <SelectTrigger>
                    <SelectValue :placeholder="t('Select_Language')" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English</SelectItem>
                    <SelectItem value="fr-FR">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="grid gap-2" v-if="editingUser">
                <Label for="role">{{ t("Role") }}</Label>
                <Select v-model="role">
                  <SelectTrigger>
                    <SelectValue :placeholder="t('Select_Role')" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div v-if="!editingUser" class="grid gap-2">
                <Label for="password">{{ t("Password") }}</Label>
                <Input
                  id="password"
                  type="password"
                  v-model="password"
                  required
                />
              </div>

              <div v-if="!editingUser" class="grid gap-2">
                <Label for="confirmPassword">{{ t("Confirm_Password") }}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  v-model="confirmPassword"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                @click="dialogOpen = false"
              >
                {{ t("Cancel") }}
              </Button>
              <Button type="submit">
                {{ editingUser ? t("Update") : t("Create") }}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <Loader class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
    <div v-else>
      <UsersDataTable
        :data="users"
        :columns="columns"
        @edit="openEditDialog"
        @delete="deleteUser"
      />
    </div>
  </section>
</template>
