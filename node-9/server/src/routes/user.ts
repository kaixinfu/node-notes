import * as Koa from "koa";
import { get, post } from "../utils/decors";

const users = [
  { name: "kaixin", age: 20 },
  { name: "liping", age: 20 }
];

export default class User {
  @get("/users")
  public async list(ctx: Koa.context) {
    ctx.body = { ok: 1, data: users };
  }
  @post("/users")
  public async add(ctx: Koa.context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
