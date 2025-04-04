import { PrismaClient, Role } from "@prisma/client";

export class UserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async createUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        role: Role.USER,
      },
    });

    return user;
  }

  public async getUserById({ id }: { id: number }) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async getUserByEmail({ email }: { email: string }) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async deleteUser({ id }: { id: number }) {
    if (!id) {
      throw new Error("User ID is required");
    }

    return await this.prisma.user.delete({ where: { id } });
  }

  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  public async updateUser({
    id,
    username,
    email,
    language,
    roles,
  }: {
    id: number | undefined;
    username?: string;
    email?: string;
    language?: string;
    roles?: number[];
  }) {
    if (!id) {
      throw new Error("User ID is required");
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        language,
        ...(roles && {
          roles: {
            set: roles.map((roleId) => ({ id: roleId })),
          },
        }),
      },
    });
  }
}
