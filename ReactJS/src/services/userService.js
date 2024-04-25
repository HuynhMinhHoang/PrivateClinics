import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUser = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUser = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id,
    },
  });
};

const editUser = (data) => {
  return axios.put("/api/edit-user", data);
};

const getAllCodeService = (type) => {
  // console.log("=====", type);
  return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?type=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctor`);
};

const saveInfoDoctorService = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailInfoDoctorService = (idDoctor) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${idDoctor}`);
};

const createScheduleService = (data) => {
  return axios.post("/api/create-schedule", data);
};

const getScheduleByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getDoctorExtraInfoService = (doctorId) => {
  return axios.get(`/api/get-doctor-extrainfo-by-id?id=${doctorId}`);
};

const getProfileDoctorService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor?id=${doctorId}`);
};

const addBookingPatientService = (data) => {
  return axios.post("/api/patient-add-booking", data);
};

const verifyBookingPatientService = (data) => {
  return axios.post("/api/verify-booking", data);
};

const createSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getSpecialtyHomeService = () => {
  return axios.get("/api/top-specialty-home");
};

const getDescriptionSpecialtyByIdService = (id, location) => {
  return axios.get(
    `/api/get-description-specialty-byId?id=${id}&location=${location}`
  );
};

const createClinicService = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getClinicHomeService = () => {
  return axios.get("/api/top-clinic-home");
};

const getDescriptionClinicByIdService = (id, location) => {
  return axios.get(
    `/api/get-description-clinic-byId?id=${id}&location=${location}`
  );
};

const getListBookingService = (idDoctor, date) => {
  return axios.get(`/api/get-list-booking?idDoctor=${idDoctor}&date=${date}`);
};
export {
  handleLoginAPI,
  getAllUser,
  createNewUser,
  deleteUser,
  editUser,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveInfoDoctorService,
  getDetailInfoDoctorService,
  createScheduleService,
  getScheduleByDateService,
  getDoctorExtraInfoService,
  getProfileDoctorService,
  addBookingPatientService,
  verifyBookingPatientService,
  createSpecialtyService,
  getSpecialtyHomeService,
  getDescriptionSpecialtyByIdService,
  createClinicService,
  getClinicHomeService,
  getDescriptionClinicByIdService,
  getListBookingService,
};
