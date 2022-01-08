const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const mongoose = require('mongoose');

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(routes);
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Актуальная ссылка на сервер: http://localhost:${PORT}`);
});
