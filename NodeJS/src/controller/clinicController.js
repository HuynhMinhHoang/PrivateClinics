import db from "../models/index";
import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let data = await clinicService.createClinicService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let getClinicHome = async (req, res) => {
  try {
    let data = await clinicService.getClinicHomeService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let getDescriptionClinicById = async (req, res) => {
  try {
    let data = await clinicService.getDescriptionClinicByIdService(
      req.query.id,
      req.query.location
    );
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
  createClinic,
  getClinicHome,
  getDescriptionClinicById,
};
