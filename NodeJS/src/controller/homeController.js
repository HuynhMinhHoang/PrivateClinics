import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log("================");
    // console.log(data);
    // console.log("================");

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  // console.log(req.body);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let dataUser = await CRUDService.getAllUser();
  // console.log("================");
  // console.log(dataUser);
  // console.log("================");

  return res.render("displayCRUD.ejs", {
    dataUser: dataUser,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoId(userId);

    return res.render("editCRUD.ejs", {
      userData: userData,
    });
  } else {
    return res.send("khong co id user");
  }
  // console.log(userId);
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);

  return res.render("displayCRUD.ejs", {
    dataUser: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("delete success");
  } else {
    return res.send("delete error");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
