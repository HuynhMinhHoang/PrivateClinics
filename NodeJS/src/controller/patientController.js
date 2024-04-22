import db from "../models/index";
import patientService from "../services/patientService";

let addBookingPatient = async (req, res) => {
  try {
    let data = await patientService.addBookingPatient(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassage: "Lỗi servers !!!",
    });
  }
};

let verifyBooking = async (req, res) => {
  try {
    let data = await patientService.verifyBookingPatient(req.body);
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
  addBookingPatient: addBookingPatient,
  verifyBooking: verifyBooking,
};
