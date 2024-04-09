import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Sai mat khau!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "khong tim thay user nay";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email khong ton tai";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: { id: userId },
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Email ton tai!",
        });
      } else {
        let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcryptjs,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.image,
        });

        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//hash passwrod
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Vui lòng điền đủ thông tin!",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phonenumber = data.phonenumber;
        user.email = data.email;
        if (data.image) {
          user.image = data.image;
        }

        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Edit thanh cong",
          info: user,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Khong tim thay user",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });

      if (user) {
        await user.destroy();
        resolve({
          errCode: 0,
          message: "Xoa thanh cong!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User khong ton tai!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allcode = await db.Allcode.findAll({
        where: { type: typeInput },
      });
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Vui long truyền Type",
        });
      } else {
        resolve({
          errCode: 0,
          data: allcode,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCodeService: getAllCodeService,
};
