//nhiệm vụ service là nhận data từ controller và thao tác với database, sau đó gửi lên lại controlelr
import bcrypt from "bcryptjs";
import db from "../models/index";

//create account
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcryptjs,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === 1 ? true : false,
        // image: DataTypes.STRING,
        roleId: data.roleId,
        // positionId: DataTypes.STRING,
      });
      resolve("Create User Success");
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

//get all users
let getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

//get user info by id
let getUserInfoId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

//update user info
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

//delete user
let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  hashUserPassword: hashUserPassword,
  getAllUser: getAllUser,
  getUserInfoId: getUserInfoId,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
