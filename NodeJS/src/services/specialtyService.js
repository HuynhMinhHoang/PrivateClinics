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

const getSpecialtyHomeService = (limit) => {
  return new Promise(async (resolve, reject) => {
    limit = parseInt(limit);
    try {
      let data = await db.Specialty.findAll({
        limit: limit,
        // include: [
        //   {
        //     model: db.Allcode,
        //     as: "positionData",
        //     attributes: ["valueEn", "valueVi"],
        //   },
        //   {
        //     model: db.Allcode,
        //     as: "genderData",
        //     attributes: ["valueEn", "valueVi"],
        //   },
        // ],
        // nest: true,
      });
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

module.exports = {
  createSpecialtyService: createSpecialtyService,
  getSpecialtyHomeService: getSpecialtyHomeService,
};
