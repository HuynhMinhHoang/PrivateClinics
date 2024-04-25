import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";

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

  route.get("/api/top-doctor-home", doctorController.getTopDoctorHome);

  route.get("/api/get-all-doctor", doctorController.getAllDoctor);
  route.post("/api/save-info-doctor", doctorController.saveInfoDoctor);
  route.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );

  route.post("/api/create-schedule", doctorController.createSchedule);

  route.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );

  route.get(
    "/api/get-doctor-extrainfo-by-id",
    doctorController.getDoctorExtraInfo
  );

  route.get("/api/get-profile-doctor", doctorController.getProfileDoctor);

  route.post("/api/patient-add-booking", patientController.addBookingPatient);

  route.post("/api/verify-booking", patientController.verifyBooking);

  route.post("/api/create-new-specialty", specialtyController.createSpecialty);

  route.get("/api/top-specialty-home", specialtyController.getSpecialtyHome);

  route.get(
    "/api/get-description-specialty-byId",
    specialtyController.getDescriptionSpecialtyById
  );

  route.post("/api/create-new-clinic", clinicController.createClinic);

  route.get("/api/top-clinic-home", clinicController.getClinicHome);

  route.get(
    "/api/get-description-clinic-byId",
    clinicController.getDescriptionClinicById
  );

  route.get("/api/get-list-booking", doctorController.getListBooking);

  return app.use("/", route);
};

module.exports = initWebRoute;
