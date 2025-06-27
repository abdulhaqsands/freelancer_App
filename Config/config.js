require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASS: process.env.USER_PASS,
};
