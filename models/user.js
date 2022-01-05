const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'name' - 30 символов."],
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длина поля 'about' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'about' - 30 символов."],
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});

module.exports = mongoose.model("user", userSchema);