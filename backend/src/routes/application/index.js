import applicationController from "../../controllers/applicationController";
import mainHandler from "../../handlers/errorHandlers";
import express from "express";
import { APPLICATION_SCHEMA } from "../../validations/application";
import { isAuth } from "../../middleware/isAuth";

const router = express.Router();

const authRoutes = (app) => {
  /**
   * Add Application
   */
  router.post(
    "/add",
    // APPLICATION_SCHEMA.ADD_APPLICATION,
    mainHandler.catchErrors(applicationController.addApplication)
  );
  /**
   * Edit Application
   */
  router.put(
    "/edit/:id",
    isAuth,
    APPLICATION_SCHEMA.ADD_APPLICATION,
    mainHandler.catchErrors(applicationController.editApplication)
  );
  /**
   * List Applications
   */
  router.get(
    "/list",
    isAuth,
    mainHandler.catchErrors(applicationController.listApplications)
  );
  /**
   * View Application by ID
   */
  router.get(
    "/view/:id",
    isAuth,
    mainHandler.catchErrors(applicationController.viewApplicationDetails)
  );
  /**
   * Delete Application by ID
   */
  router.delete(
    "/:id",
    isAuth,
    mainHandler.catchErrors(applicationController.deleteApplicationDetails)
  );

  app.use("/api/application", router);
};

export default authRoutes;
