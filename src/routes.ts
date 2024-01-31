import { Express, Request, Response } from "express"
import { createUserHandler } from "./controller/user.controller"
import validate from "./middleware/validateResource"
import { userSchema } from "./schema/user.schema"
import { createUserSessionsHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller"
import { createSessionSchema } from "./schema/session.schema"
import requireUser from "./middleware/requireUser"
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema"
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller"


function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200))

    app.post("/api/users", validate(userSchema), createUserHandler)

    app.post("/api/sessions", validate(createSessionSchema), createUserSessionsHandler)

    app.get("/api/sessions", requireUser, getUserSessionsHandler)
    
    app.delete("/api/sessions", requireUser, deleteSessionHandler)





    app.post("/api/products", [requireUser, validate(createProductSchema)], createProductHandler)
    app.patch("/api/products/:productId", [requireUser, validate(updateProductSchema)], updateProductHandler)
    app.get("/api/products/:productId", [ validate(getProductSchema)], getProductHandler)
    app.delete("/api/products/:productId", [requireUser, validate(deleteProductSchema)], deleteProductHandler)
}

export default routes