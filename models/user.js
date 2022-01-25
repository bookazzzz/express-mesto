const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'name' - 30 символов."],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длина поля 'about' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'about' - 30 символов."],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g.test(url),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlrngth: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
