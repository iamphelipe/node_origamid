
import { Core } from "./core/core.ts";
import { getCourseSlug } from "./core/database.ts";
import { bodyJson } from "./core/middleware/body-json.ts";
import { logger } from "./core/middleware/logger.ts";

const core = new Core;

core.router.use([logger])

core.router.get("/curso/:slug", (req, res) => {

    const { slug } = req.params;
    const curso = getCourseSlug(slug);
    
    if(curso) {
        res.status(200).json(curso);
    } else {
        res.status(404).json("curso não encontrado!")
    }

});

core.router.get("/", (req, res) => {

    res.status(200).json("Olá")

});

core.init();