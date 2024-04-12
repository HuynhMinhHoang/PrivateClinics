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

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  saveInfoDoctor: saveInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
};
