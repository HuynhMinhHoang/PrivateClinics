import db from "../models/index";

let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    limit = parseInt(limit);
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: {
          roleId: "R2",
        },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        // raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errCode: 0,
        data: doctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveInfoDoctorService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.doctorId || !input.contentHTML || !input.contentMarkDown) {
        console.log("input");
        resolve({
          errCode: 1,
          errMassage: "Error input!!!",
        });
      } else {
        await db.MarkDown.create({
          contentHTML: input.contentHTML,
          contentMarkDown: input.contentMarkDown,
          description: input.description,
          doctorId: input.doctorId,
        });
        resolve({
          errCode: 0,
          errMassage: "Save info doctor success!!",
        });
      }
    } catch (e) {
      console.log("error", e);

      reject(e);
    }
  });
};

let getDetailDoctorByIdService = (idDoctor) => {
  return new Promise(async (resvole, reject) => {
    try {
      if (!idDoctor) {
        resvole({
          errCode: 1,
          errMassage: "Lỗi input !!",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: idDoctor },
          attributes: {
            exclude: ["password"],
          },
          include: [
            //markdown
            {
              model: db.MarkDown,
              attributes: {
                exclude: ["createdAt", "updatedAt", "clinicId", "specialtyId"],
              },
            },
            //allcode
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          nest: true,
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        resvole({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctorService: getAllDoctorService,
  saveInfoDoctorService: saveInfoDoctorService,
  getDetailDoctorByIdService: getDetailDoctorByIdService,
};
