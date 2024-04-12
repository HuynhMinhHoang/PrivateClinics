const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("clinic-main-db", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection database successfully.");
  } catch (error) {
    console.error("ERROR connection database", error);
  }
};

module.exports = connectDB;
