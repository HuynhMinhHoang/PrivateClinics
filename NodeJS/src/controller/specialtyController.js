import db from "../models/index";
import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let data = await specialtyService.createSpecialtyService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let getSpecialtyHome = async (req, res) => {
  try {
    let data = await specialtyService.getSpecialtyHomeService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let getDescriptionSpecialtyById = async (req, res) => {
  try {
    let data = await specialtyService.getDescriptionSpecialtyByIdService(
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
  createSpecialty,
  getSpecialtyHome,
  getDescriptionSpecialtyById,
};
