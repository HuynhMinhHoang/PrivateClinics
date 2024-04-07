import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Lỗi input ",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    userData,
    // user: userData.user ? userData.user : { err: "ko co user" },
  });
};

let handleGetAllUser = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Khong tim thay id user",
      users: [],
    });
  }

  let users = await userService.getAllUser(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);

  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Loi khong tim thay id",
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let type = req.query.type;
    console.log("=====", type);

    let data = await userService.getAllCodeService(type);
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Message get allcode Error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server get Allcodes",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
