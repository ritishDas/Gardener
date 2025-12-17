// server.ts
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gardenerRoute from './routes/gardener.route.js'
import homeRoute from './routes/home.route.js'
import eventRoute from './routes/event.route.js'
import participationRoute from './routes/participation.route.js'
import { initDB } from './db.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('views', path.join(__dirname, '../src/frontend/views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '../src/frontend')));
app.use(express.json());
app.use(gardenerRoute);
app.use(homeRoute);
app.use(eventRoute);
app.use(participationRoute);

const PORT = 3000;

initDB().then(
  () => {
    app.listen(PORT, () => {
      console.log("server listening 🚀🚀🚀 PORT:", PORT);
    });
  }
)



