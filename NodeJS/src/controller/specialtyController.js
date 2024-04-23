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
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let data = await specialtyService.getSpecialtyHomeService(limit);
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
};
