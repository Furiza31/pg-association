import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface TypedRequest<T, P> extends Request {
  body: T & {
    user?: Partial<User>;
    prisma: PrismaClient;
  };
  params: P & ParamsDictionary;
}
