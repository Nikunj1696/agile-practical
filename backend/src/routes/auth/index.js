import auth from "../../controllers/authController";
import mainHandler from "../../handlers/errorHandlers";
import express from "express";
import { ADMIN_SCHEMAS } from "../../validations/admin";

const router = express.Router();

const authRoutes = (app) => {
  /**
   * Seed Admin
   */
  router.post("/seed-admin", mainHandler.catchErrors(auth.signUp));

  /**
   * Login Admin
   */
  router.post("/login", ADMIN_SCHEMAS.LOGIN , mainHandler.catchErrors(auth.login));
  router.delete("/logout", mainHandler.catchErrors(auth.logout));

  app.use("/api/auth", router);
};

export default authRoutes;
