import type { CustomRequest } from "./htpp/custom-request.ts";
import type { CustomResponse } from "./htpp/custom-response.ts";

export type Handler = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void> | void;

export type Midleware = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void> | void;

type Routes = {
    [method: string]: {
        [path: string]: {
            handler: Handler;
            middlewares: Midleware[];
        }
    }
}


export class Router {

    routes: Routes = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {},
        HEAD: {}
    };
    middlewares: Midleware[] = []

    get(route: string, handler: Handler, middlewares: Midleware[] = []) {
        this.routes["GET"][route] = { handler, middlewares }
    }

    post(route: string, handler: Handler, middlewares: Midleware[] = []) {
        this.routes["POST"][route] = { handler, middlewares }
    }

    put(route: string, handler: Handler, middlewares: Midleware[] = []) {
        this.routes["PUT"][route] = { handler, middlewares }
    }

    delete(route: string, handler: Handler, middlewares: Midleware[] = []) {
        this.routes["DELETE"][route] = { handler, middlewares }
    }

    head(route: string, handler: Handler, middlewares: Midleware[] = []) {
        this.routes["HEAD"][route] = { handler, middlewares }
    }

    use(middlewares: Midleware[]) {
        this.middlewares.push(...middlewares)
    }

    find(method: "GET" | "POST", pathname: string){
        const routesByMethod = this.routes[method];
        if(!routesByMethod) return null;
        const matchedRoute = routesByMethod[pathname];
        if(matchedRoute) return { route: matchedRoute, params: {} };

        const reqParts = pathname.split("/").filter(Boolean);

        for (const route of Object.keys(routesByMethod)) {
            if(!route.includes(":")) continue;
            const routeParts = route.split("/").filter(Boolean); 
            
            if(reqParts.length !== routeParts.length) continue;
            if(reqParts[0] !== routeParts[0]) continue;

            const params: Record<string, string> = {};
            let ok = true;

            for(let i = 0; i < reqParts.length; i++) {
                const segment = routeParts[i];
                const value = reqParts[i]; 

                if(segment.startsWith(':')) {
                    params[segment.slice(1)] = value;
                } else if (segment !== value) {
                    ok = false;
                    break
                }
            }; 
            if(ok) {
                return { params, route: routesByMethod[route] };
            }
        } 
        
        return null;
    }

}
