import { TypedRequest } from "../types/express-request-type";

export class LoggerService {
  public static logRequest(req: TypedRequest<{}, {}>) {
    console.log("-".repeat(50));
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url}\nUser ID: ${
        req.body.user?.id
      }\nUser agent: ${req.headers["user-agent"]}`
    );
    console.log("-".repeat(50));
  }
}
