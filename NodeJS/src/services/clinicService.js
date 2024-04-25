import db from "../models/index";

const createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.nameClinic ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown ||
        !data.addressClinic
      ) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu dữ liệu !!",
        });
      } else {
        let newClinic = await db.Clinic.create({
          name: data.nameClinic,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
          image: data.imageClinic,
          address: data.addressClinic,
        });

        resolve({
          errCode: 0,
          errMessage: "OK",
          data: newClinic,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getClinicHomeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
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

const getDescriptionClinicByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Thiếu dữ liệu!!!",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: id,
          },
          attributes: [
            "descriptionHTML",
            "descriptionMarkDown",
            "name",
            "address",
            "image",
          ],
          raw: true,
        });

        if (data) {
          data.image = new Buffer(data.image, "base64").toString("binary");

          let doctorClinic = [];
          doctorClinic = await db.Doctor_Info.findAll({
            where: {
              clinicId: id,
            },
            attributes: ["doctorId", "clinicId"],
            raw: true,
          });

          data.doctorClinic = doctorClinic;
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
  createClinicService: createClinicService,
  getClinicHomeService: getClinicHomeService,
  getDescriptionClinicByIdService: getDescriptionClinicByIdService,
};
