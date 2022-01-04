const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});



app.listen(PORT, () => {
  console.log(`Актуальная ссылка на сервак: http://localhost:${PORT}`);
});