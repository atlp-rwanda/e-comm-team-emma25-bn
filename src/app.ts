/* eslint-disable @typescript-eslint/no-var-requires */

import express, { Application } from "express";
import { config } from "dotenv";

import swaggerDocs from "./docs/swagger";
import connectdb from "./db/database";
import roleRoutes from "./routes/rolesPermissionsRoutes/role.route";
import rolePermissionRoutes from "./routes/rolesPermissionsRoutes/rolePermission.route";
import permissionRoutes from "./routes/rolesPermissionsRoutes/permission.route";
import createServer from "./utils/server";
import passport from "passport";
import session from "express-session";
import "./config/googlePassport.config";

const app: Application = createServer()

app.use(
    session({
        secret: `process.env.SECRET`,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

config();
//middleware section
app.use(express.json());
app.use(roleRoutes);
app.use(permissionRoutes);
app.use(rolePermissionRoutes);


const PORT = process.env.PORT || 3000;
app.get("/", (req, res) =>
    res.send('Hello, use  "/docs" to view the swagger docs')
);
/*called the database connection below */
connectdb().then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    swaggerDocs(app);
    // change this to just port in case someone is listening from 127.0.0.1 instead of localhost
});

export default app;
