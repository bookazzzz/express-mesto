const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Актуальная ссылка на сервер: http://localhost:${PORT}`);
});
