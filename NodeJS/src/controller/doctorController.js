import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let data = await doctorService.getTopDoctorHome(limit);
    return res.status(200).json(data);
  } catch (e) {
    console.log("============", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form server",
    });
  }
};

let getAllDoctor = async (req, res) => {
  try {
    const reqs = await doctorService.getAllDoctorService();
    return res.status(200).json(reqs);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Lỗi server!!",
    });
  }
};

let saveInfoDoctor = async (req, res) => {
  try {
    let reqs = await doctorService.saveInfoDoctorService(req.body);
    return res.status(200).json(reqs);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Lỗi server!!!",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let idDoctor = req.query.id;
    let data = await doctorService.getDetailDoctorByIdService(idDoctor);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Lỗi server!!",
    });
  }
};
let createSchedule = async (req, res) => {
  try {
    let data = await doctorService.createScheduleService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Lỗi server!!",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let data = await doctorService.getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Lỗi server!!",
    });
  }
};

let getDoctorExtraInfo = async (req, res) => {
  try {
    let idDoctor = req.query.id;
    // console.log("=========", idDoctor);
    let data = await doctorService.getDoctorExtraInfoService(idDoctor);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let getProfileDoctor = async (req, res) => {
  try {
    let idDoctor = req.query.id;
    let data = await doctorService.getProfileDoctorService(idDoctor);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let getListBooking = async (req, res) => {
  try {
    let idDoctor = req.query.idDoctor;
    let date = req.query.date;
    let data = await doctorService.getListBookingService(idDoctor, date);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  saveInfoDoctor: saveInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  createSchedule: createSchedule,
  getScheduleByDate: getScheduleByDate,
  getDoctorExtraInfo: getDoctorExtraInfo,
  getProfileDoctor: getProfileDoctor,
  getListBooking: getListBooking,
};
