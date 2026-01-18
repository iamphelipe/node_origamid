import type { CustomRequest } from "./htpp/custom-request.ts";
import type { CustomResponse } from "./htpp/custom-response.ts";

type Handler = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void> | void;

type RouteMap = Record<string, Handler>

export class Router {

    routes: {
        GET: RouteMap,
        POST: RouteMap
    } = {
        GET: {},
        POST: {}
    }

    get(route: string, handler: Handler) {
        this.routes["GET"][route] = handler
    }

    post(route: string, handler: Handler) {
        this.routes["POST"][route] = handler
    }

    find(method: "GET" | "POST", route: string){
        return this.routes[method]?.[route] || null;
    }

}
