export interface UserType {
  id: number | null;
  username: string | null;
  email: string | null;
  language: string | null;
  role: "ADMIN" | "USER" | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
