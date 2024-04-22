//nhiệm vụ service là nhận data từ controller và thao tác với database, sau đó gửi lên lại controlelr
import bcrypt from "bcryptjs";
import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

const addBookingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        // !data.fullName ||
        !data.email
        // !data.gender ||
        // !data.phone ||
        // !data.address ||
        // !data.reason ||
        // !data.forSomeone
      ) {
        resolve({
          errCode: 1,
          errMessage: "Lỗi thiếu thông tin!!",
        });
      } else {
        let idToken = uuidv4();
        let linkVerifyEmail = `${process.env.URL_REACT}/verify-booking?token=${idToken}&doctorId=${data.doctorId}`;

        let userInfo = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });

        if (userInfo && userInfo[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: userInfo[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: userInfo[0].id,
              date: data.date,
              timeType: data.timeType,
              token: idToken,
            },
            raw: false,
          });
        }
        console.log("========", userInfo);
        //send email
        await emailService.sendEmailService({
          email: data.email,
          subject: getSubject(data),
          html: getBodyHTMLEmail(data, linkVerifyEmail),
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBodyHTMLEmail = (data, linkVerifyEmail) => {
  let result = "";
  if (data.languageParent === "vi") {
    result = `
    <div>
      <p>Xin chào ${data.fullName},</p>
      <p>Lịch hẹn của bạn đã được xác nhận thành công. Chúng tôi rất mong chờ gặp bạn!</p>

      <p>Vui lòng click vào <a href="${linkVerifyEmail}" target="_blank">xác nhận</a> để hoàn tất.</p>

      
      <h4>Thông tin lịch hẹn:</h4>
      <ul>
          <li><strong>Bác sĩ khám:</strong> ${data.nameDoctor}</li>
          <li><strong>Ngày:</strong> ${data.days}</li>
          <li><strong>Thời gian:</strong> ${data.time}</li>
          <li><strong>Địa điểm:</strong> Phòng khám PrivateClinics</li>
      </ul>


  
      <p>Nếu bạn có bất kỳ câu hỏi hoặc cần sự trợ giúp, vui lòng liên hệ với chúng tôi.</p>
      <p>Cảm ơn bạn!</p>
      
      <p>Trân trọng,<br>
      [PrivateClinics]</p>
    </div>`;
  } else if (data.languageParent === "en") {
    result = `
     <div>
      <p>Hello ${data.fullName},</p>
      <p>Your appointment has been confirmed successfully. We look forward to seeing you!</p>

      <p>Vui lòng click vào <a href="${linkVerifyEmail}" target="_blank">xác nhận</a> để hoàn tất.</p>

      
      <h4>Appointment Information:</h4>
      <ul>
          <li><strong>Doctor:</strong> ${data.nameDoctor}</li>
          <li><strong>Date:</strong> ${data.days}</li>
          <li><strong>Time:</strong> ${data.time}</li>
          <li><strong>Location:</strong> PrivateClinics Clinic</li>
      </ul>
    
      <p>If you have any questions or need assistance, please contact us.</p>
      <p>Thank you!</p>
      
      <p>Best regards,<br>
      [PrivateClinics]</p>
    </div>
    `;
  }
  return result;
};

let getSubject = (data) => {
  let result = "";
  if (data.languageParent === "vi") {
    result = `PrivateClinics - Xác nhận lịch hẹn (Vietnamese)`;
  } else if (data.languageParent === "en") {
    result = `PrivateClinics - Confirm Appointment (English)`;
  }
  return result;
};

const verifyBookingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.idToken || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Lỗi thiếu thông tin !!!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.idToken,
            statusId: "S1",
          },
          raw: false, //false thì mới update được
        });
        console.log("=========", appointment);
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Xác nhận lịch hẹn thành công!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Vui lòng thử lại!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  addBookingPatient: addBookingPatient,
  verifyBookingPatient: verifyBookingPatient,
};
