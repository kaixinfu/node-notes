import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";

type LoadOptions = {
  extname?: string;
};

type RouteOptions = {
  prefix?: string;
  middlewares?: Array<Koa.Middleware>;
};

const router = new KoaRouter();

const decorate = (
  method: HTTPMethod,
  path: string,
  options: RouteOptions = {},
  router: KoaRouter
) => {
  return (target, property: string) => {
    // console.log(method, "target", target);
    // console.log(method, "property", property);
    // console.log(method, "options", options);

    const url = options.prefix ? options.prefix + path : path;
    /**
     * 类似于 route.get('/users', () => {})
     */
    router[method](url, target[property]);
  };
};

const method = method => (path: string, options?: RouteOptions) =>
  decorate(method, path, options, router);

export const get = method("get");
export const post = method("post");
export const put = method("put");
export const del = method("del");
export const patch = method("patch");

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || ".{js,ts}";
  console.log("extname", extname, `./**/*${extname}`);
  // console.log("folder", folder);
  // console.log("require", require("path"));
  console.log(".....0", require("path").join(folder, `./**/*${extname}`));
  console.log(
    ".....1",
    glob.sync(require("path").join(folder, `./**/*${extname}`))
  );

  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach(item => require(item));
  return router;
};
