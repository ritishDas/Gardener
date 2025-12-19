// server.ts
import 'dotenv/config';
import express from 'express';
import gardenerRoute from './routes/gardener.route.js'
import { initDB } from './db.js';

const app = express();



app.set('views', './src/frontend/views');
app.set("view engine", "ejs");
app.use(express.static('./src/frontend'));
app.use(express.json());
app.use(gardenerRoute);

const PORT = 3000;

initDB().then(
  () => {
    app.listen(PORT, () => {
      console.log("server listening 🚀🚀🚀 PORT:", PORT);
    });
  }
)



