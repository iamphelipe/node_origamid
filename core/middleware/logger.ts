import type { Midleware } from "../router.ts";

export const logger: Midleware = (req, res) => {
    console.log(`${req.method} ${req.pathname}`);
    
}