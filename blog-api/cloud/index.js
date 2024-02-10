const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "gssamir",
  api_key: "361758986272245",
  api_secret: "hRSTvhblZiuktMqNY7xVVwn0krA",
  secure: true,
});

module.exports = cloudinary;
