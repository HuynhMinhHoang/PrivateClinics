import db from "../models/index";

const createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.nameSpecialty ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu dữ liệu !!",
        });
      } else {
        let newSpecialty = await db.Specialty.create({
          name: data.nameSpecialty,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
          image: data.imageSpecialty,
        });

        resolve({
          errCode: 0,
          errMessage: "OK",
          data: newSpecialty,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getSpecialtyHomeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDescriptionSpecialtyByIdService = (id, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !location) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu dữ liệu!!!",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: id,
          },
          attributes: ["descriptionHTML", "descriptionMarkDown"],
          raw: true,
        });

        if (data) {
          let doctorSpecialty = [];

          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: {
                specialtyId: id,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          } else {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: {
                specialtyId: id,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          }

          data.doctorSpecialty = doctorSpecialty;
        } else data = {};

        resolve({
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
  createSpecialtyService: createSpecialtyService,
  getSpecialtyHomeService: getSpecialtyHomeService,
  getDescriptionSpecialtyByIdService: getDescriptionSpecialtyByIdService,
};
