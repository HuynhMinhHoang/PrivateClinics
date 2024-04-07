import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";

let route = express.Router();

let initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/crud", homeController.getCRUD);

  route.post("/post-crud", homeController.postCRUD);
  route.get("/get-crud", homeController.displayGetCRUD);
  route.get("/edit-crud", homeController.getEditCRUD);
  route.post("/put-crud", homeController.putCRUD);
  route.get("/delete-crud", homeController.deleteCRUD);

  route.post("/api/login", userController.handleLogin);
  route.get("/api/get-all-user", userController.handleGetAllUser);
  route.post("/api/create-new-user", userController.handleCreateNewUser);
  route.put("/api/edit-user", userController.handleEditUser);
  route.delete("/api/delete-user", userController.handleDeleteUser);

  route.get("/api/allcode", userController.getAllCode);

  return app.use("/", route);
};

module.exports = initWebRoute;
