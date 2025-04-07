import { Button } from "@/components/ui/button";
import { UserType } from "@/types/UserType";
import { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import RowActions from "./row-actions.vue";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [h("span", "ID"), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "text-left" }, row.getValue("id")),
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [h("span", "Username"), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "text-left" }, row.getValue("username")),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [h("span", "Email"), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "text-left" }, row.getValue("email")),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [h("span", "Role"), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string | null;
      return h(
        "div",
        {
          class: `text-left font-medium ${
            role === "ADMIN" ? "text-blue-600" : "text-green-600"
          }`,
        },
        role || "USER"
      );
    },
  },
  {
    accessorKey: "language",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [h("span", "Language"), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "text-left" }, row.getValue("language")),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          h("span", "Created At"),
          h(ArrowUpDown, { class: "ml-2 h-4 w-4" }),
        ]
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return h(
        "div",
        { class: "text-left" },
        date ? new Date(date as string).toLocaleDateString() : ""
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(RowActions, {
        user: row.original,
      });
    },
  },
];
